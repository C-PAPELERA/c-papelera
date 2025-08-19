"use server";

import { TAGS } from "@/constants/ecwid";
import { createCart, ecwidFetch, getCart } from "@/lib/ecwid";
import { cookies } from "next/headers";

export async function createCartAction() {
  const cart = await createCart(); // Esta función no debe setear cookies internamente

  if (!cart.id || !cart.sessionToken) {
    console.error("Error al crear el carrito");
    return undefined;
  }

  const cookieStore = await cookies();

  cookieStore.set("cartId", cart.id);
  cookieStore.set(
    `ec-${process.env.ECWID_STORE_ID}-session`,
    cart.sessionToken
  );

  return cart.totalQuantity;
}

export async function getCartAction() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return await createCartAction();
  }

  const res = await getCart(cartId);

  if (!res) {
    console.log("Error al obtener el carrito");
    return undefined;
  }

  return res;
}

export async function addToCartAction(item) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(
    `ec-${process.env.ECWID_STORE_ID}-session`
  )?.value;

  const res = await ecwidFetch({
    method: "POST",
    path: `/checkout/add-cart-item`,
    useStorefrontAPI: true,
    cache: "no-store",
    tags: [TAGS.cart],
    payload: {
      lang: "en",
      newCartItem: item,
    },
    headers: {
      Authorization: "Bearer " + sessionToken,
    },
  });

  if (!res.body || res.status !== 200) {
    console.error("Error al agregar al carrito");
    return undefined;
  }

  return {
    id: res.body.checkout.id,
    items: res.body.checkout.cartItems,
    totalQuantity:
      res.body.checkout.cartItems?.reduce(
        (n, { quantity }) => n + quantity,
        0
      ) || 0,
  };
}

export async function searchProducts(text) {
  const res = await ecwidFetch({
    method: "GET",
    path: `/products`,
    query: { keyword: text, enabled: "true", limit: 5, searchMethod: "CP" },
  });

  return res.body?.items;
}
