'use client';

import useStore from "@/hooks/useStore";
import { Button } from "@/components/ui/button";

export default function TestPage() {

  const { setOpenSideCart } = useStore();

  return (
    <div className="mb-100">
      <h1>Test Page</h1>
      <Button variant="outline" className={""} onClick={() => setOpenSideCart(true)}>
        Abrir side cart
      </Button>
    </div>
  );
}