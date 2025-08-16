"use client";

import { addToCartAction, getCartAction } from "@/app/actions/store";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
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
        cart,
        setCart,
        totalCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
