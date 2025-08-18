"use client";

import Link from "next/link";
import useStore from "@/hooks/useStore";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const { totalCart } = useStore();

  return (
    <div className="relative flex gap-2 items-center">
      <a href="/store/cart?store-page=cart" rel="noopener noreferrer">
        <div className="p-1.5 bg-white rounded-lg">
          <ShoppingBag strokeWidth={1.5} className="size-5 cursor-pointer" stroke="#012F49" />
        </div>
      </a>
      <div className="flex absolute -top-2 -right-3 rounded-full bg-black size-5 items-center justify-center">
        <span className="font-medium text-xs text-white text-center">
          {totalCart || 0}
        </span>
      </div>
    </div>
  );
};

export default Cart;
