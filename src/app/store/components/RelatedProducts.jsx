"use client";

// Hooks
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import RelatedProductCard from "./RelatedProductCard";

// Components

const RelatedProducts = ({ productIds }) => {
  const [products, setProducts] = useState([]);

  const fetchRelatedProducts = async () => {
    if (productIds.length === 0) return;

    const refererIds = productIds.join(",");
    const res = await supabase.functions.invoke("ecwidConnection", {
      body: { params: { productId: refererIds }, resource: "products" },
    });

    const data = res.data;
    setProducts(data.items);
    return;
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [productIds]);

  return (
    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
      {products.map((product) => (
        <RelatedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
