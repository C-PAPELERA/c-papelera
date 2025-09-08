"use client";

// Hooks
import { useEffect, useState } from "react";
import { getProductstByCategory } from "@/app/actions/store";
import ProductCard from "./ProductCard";

// Components

const SameCategoryProducts = ({ categoryId }) => {  
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    if (!categoryId) return;

    const res = await getProductstByCategory(categoryId);
    setProducts(res.items);
    return;
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 lg:grid-cols-3 sm:gap-x-6 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SameCategoryProducts;
