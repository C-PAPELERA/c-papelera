"use client";

import useStore from "@/hooks/useStore";
import { ShoppingCart } from "lucide-react";

const CartSecondary = () => {
  const { totalCart } = useStore();

  return (
    <div className="relative flex gap-2 items-center mt-1">
      <a href="/store/cart?store-page=cart" rel="noopener noreferrer">
        <div className="p-1.5 bg-white rounded-lg">
          <ShoppingCart strokeWidth={2} className="size-6 cursor-pointer" stroke="#012F49" />
        </div>
      </a>
      <div className="flex absolute -top-1.5 -right-3 rounded-full bg-papelera size-5 items-center justify-center">
        <span className="font-medium text-xs text-white text-center">
          {totalCart || 0}
        </span>
      </div>
    </div>
  );
};

export default CartSecondary;
