"use client";

import useStore from "@/hooks/useStore";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const { totalCart, setOpenSideCart } = useStore();

  return (
    <div className="relative flex gap-2 items-center cursor-pointer" onClick={() => setOpenSideCart(true)}>
      <div className="p-1.5 bg-white rounded-lg">
        <ShoppingCart strokeWidth={1.5} className="size-5 cursor-pointer" stroke="#012F49" />
      </div>
      <div className="flex absolute -top-2 -right-3 rounded-full bg-black size-5 items-center justify-center">
        <span className="font-medium text-xs text-white text-center">
          {totalCart || 0}
        </span>
      </div>
    </div>
  );
};

export default Cart;
