'use client'

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/ecwid-functions";
import ProductCard from "../../app/store/components/ProductCard";

const FeaturedProducts = ({ query = null, limit = 5 }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getFeaturedProducts() {
      const res = await getProducts({ query: query, limit: limit });
      setProducts(res);
    }
    getFeaturedProducts()
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <ul
          role="list"
          className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-4"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProducts;