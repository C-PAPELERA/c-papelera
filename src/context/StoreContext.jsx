"use client";

import { addToCartAction, getCartAction, clearCartAction } from "@/app/actions/store";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [openSideCart, setOpenSideCart] = useState(false);
  const [totalCart, setTotalCart] = useState(null);
  const pathname = usePathname();

  const addToCart = async (product) => {
    const res = await addToCartAction(product);

    if (!res.id) {
      toast.error("Error al agregar al carrito");
      return;
    }

    toast.success("Producto agregado al carrito");
    setTotalCart((prev) => prev + product.quantity);
  };

  const removeFromCart = async (productToRemove, products) => {

    const res = await clearCartAction();

    products.forEach(item => {
      if (item.identifier.productId !== productToRemove.identifier.productId) {
        addToCartAction({
          category: item.categoryId,
          identifier: { productId: item.identifier.productId },
          isPreorder: false,
          quantity: item.quantity,
        });
      }
    });

    if (!res.id) {
      toast.error("Error al eliminar del carrito");
      return;
    }

    toast.error("Producto eliminado del carrito");
    setTotalCart((prev) => prev - productToRemove.quantity);
  }

  const handleGetCart = async () => {
    const res = await getCartAction(); // Del lado del servidor

    setCart(res);
    setTotalCart(res?.totalQuantity || 0);
  };

  useEffect(() => {
    handleGetCart();
  }, [pathname]);

  return (
    <StoreContext.Provider
      value={{
        addToCart,
        removeFromCart,
        cart,
        setCart,
        totalCart,
        openSideCart,
        setOpenSideCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
