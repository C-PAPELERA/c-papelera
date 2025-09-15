"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCartAction } from "@/app/actions/store";
import useStore from "@/hooks/useStore";

export default function CartSidebar() {

  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart, openSideCart, setOpenSideCart } = useStore();

  useEffect(() => {
    async function getCart() {
      const cart = await getCartAction();
      setCartItems(cart?.items || []);
    }
    getCart();
  }, [openSideCart]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const removeProduct = async (product) => {
    removeFromCart(product, cartItems)
    setCartItems((prev) => prev.filter((item) => item.identifier.productId !== product.identifier.productId));
  };

  return (
    <Sheet open={openSideCart} onOpenChange={setOpenSideCart}>
      <SheetContent side="right" className="flex flex-col w-[320px] sm:w-[480px]">
        <SheetHeader>
          <SheetTitle className={"text-papelera font-bold text-xl mt-5"}>Carrito de compras</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-2 mt-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.identifier.productId}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.productInfo.mediaItem.image160pxUrl}
                      alt={item.productInfo.name}
                      fill
                      className="object-cover p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/store/products/${item.identifier.productId}`} onClick={() => setOpenSideCart(false)}>
                      <p className="font-medium text-sm hover:text-papelera cursor-pointer">{item.productInfo.name}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x ${item.price.toLocaleString("es-CO")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProduct(item)}
                    className={"mr-2"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Tu carrito está vacío
            </p>
          )}
        </ScrollArea>

        <SheetFooter className="flex flex-col gap-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>TOTAL</span>
            <span>${subtotal.toLocaleString("es-CO")}</span>
          </div>
          <Button disabled={cartItems.length === 0} className={"bg-papelera hover:bg-papelera/95"}>
            <a href="/store/cart?store-page=cart" onClick={() => setOpenSideCart(false)}>
              Finalizar compra
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
