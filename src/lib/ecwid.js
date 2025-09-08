import {
  ECWID_API_URL,
  ECWID_STOREFRONT_API_URL,
  isEcwidError,
  MAIN_CATEGORY,
  TAGS,
} from "@/constants/ecwid";
import { cookies } from "next/headers";

const store_id = process.env.ECWID_STORE_ID;

const api_endpoint = `${ECWID_API_URL}${store_id}`;
const storefront_api_endpoint = `${ECWID_STOREFRONT_API_URL}${store_id}`;

export async function ecwidFetch({
  method,
  path,
  useStorefrontAPI,
  query,
  headers,
  cache,
  tags,
  payload,
  revalidate,
}) {
  try {
    var options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.ECWID_API_KEY,
        ...headers,
      },
      cache: cache,
      ...(tags && { next: { tags: tags } }),
    };

    if (revalidate) {
      options.next = { ...options.next, ...{ revalidate: revalidate } };
      console.log(options.next);
    }

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    let url;

    if (useStorefrontAPI) {
      url = storefront_api_endpoint + path;
    } else {
      url = api_endpoint + path;
    }

    if (query) {
      const searchParams = new URLSearchParams();

      Object.entries(query).forEach(([key, values]) => {
        if (Array.isArray(values)) {
          values.forEach((value) => {
            searchParams.append(key, value);
          });
        } else {
          searchParams.append(key, values);
        }
      });

      url += url.indexOf("?") >= 0 ? "&" : "?";
      url += searchParams.toString();
    }

    const result = await fetch(url, options);

    let body;

    try {
      body = await result.json();
    } catch (e) {
      console.error(e);
      body = false;
    }

    if (body.errors) {
      console.log(body.errors);
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isEcwidError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}

export async function getProducts({ query }) {
  var queryParams = {};

  //queryParams.cleanUrls = "true";
  //queryParams.baseUrl = "/";
  queryParams.enabled = "true";
  queryParams.limit = "60";

  // Busqueda
  if (query.keyword) {
    queryParams.searchMethod = `CP`;
  }

  /* if (sortKey && sortKey != "relevance") {
    queryParams.sortBy = `${sortKey}_${reverse ? "desc" : "asc"}`.toUpperCase();
  } */

  const res = await ecwidFetch({
    method: "GET",
    path: `/products`,
    query: { ...queryParams, ...query },
    //tags: [TAGS.products]
  });

  return res.body;
}

export async function getBreadcrumbs(id) {
  const categories = [];

  if (!id) return categories;

  const res = await ecwidFetch({
    method: "GET",
    path: `/categories/${id}`,
    //tags: [TAGS.products]
  });

  const category = res.body;

  if (category.id === MAIN_CATEGORY) return categories;

  categories.push({ id: category.id, name: category.name });

  if (category.parentId) {
    const parentCategories = await getBreadcrumbs(category.parentId);
    return parentCategories.concat(categories);
  }
}

export async function createCart() {
  const res = await ecwidFetch({
    method: "POST",
    path: `/checkout/create`,
    useStorefrontAPI: true,
    cache: "no-store",
    payload: {
      lang: "en",
    },
    //tags: [TAGS.cart],
  });

  let cartId = res.body.checkoutId;

  return {
    id: cartId,
    sessionToken: res.body.sessionToken,
    items: [],
    totalQuantity: 0,
  };
}

export async function getCart(cartId) {
  const cookieStore = await cookies();
  let sessionToken = cookieStore.get(`ec-${store_id}-session`)?.value;

  if (!sessionToken || !cartId) {
    return await createCart();
  }

  const res = await ecwidFetch({
    method: "POST",
    path: `/checkout`,
    useStorefrontAPI: true,
    cache: "no-store",
    tags: [TAGS.cart],
    payload: {
      lang: "en",
    },
    headers: {
      Authorization: "Bearer " + sessionToken,
    },
  });

  if (!res.body) {
    return undefined;
  }

  return {
    id: cartId,
    items: res.body.checkout.cartItems,
    totalQuantity:
      res.body.checkout.cartItems?.reduce(
        (n, { quantity }) => n + quantity,
        0
      ) || 0,
  };
}
