"use client";

// Hooks
import { useEffect, useRef, useState } from "react";

// Components
import FilterArea from "../components/FilterArea";
import ProductCard from "../components/ProductCard";
import Skeletons from "@/components/design/Skeletons";
import Pagination from "../components/Pagination";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = ({
  searchParams,
  productsRes,
  breadcrumbs,
  categories,
  sizes,
}) => {
  // Hooks general
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  // Hooks products
  const effectRan = useRef(false); // Realizar una sola consulta a la base de datos
  const [offset, setOffset] = useState(searchParams.offset || 0);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const handlerProducts = () => {
    setLoading(false); // Ocultar skeleton
    setProducts(productsRes);
    setTotalProducts(productsRes?.length || 0);
  };

  const handlerFilterSizes = (paramsObject) => {
    if (paramsObject.option_Talla) {
      const selectedSizes = paramsObject.option_Talla.split(",");
      const newProducts = new Map();

      for (const size of selectedSizes) {
        for (const product of products) {
          const hasInStock = product.combinations.some(
            (combination) =>
              combination.options.some(
                (opt) => opt.name === "Talla" && opt.value === size
              ) && combination.inStock
          );

          if (hasInStock && !newProducts.has(product.sku)) {
            newProducts.set(product.sku, product);
          }
        }
      }
      setProducts(Array.from(newProducts.values()));
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      setLoading(true);
      handlerProducts();
      handlerFilterSizes(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!effectRan.current) {
      effectRan.current = true;
      handlerProducts(productsRes);
    }
  }, []);

  return (
    <FilterArea
      setOffset={setOffset}
      breadcrumbs={breadcrumbs}
      categories={categories}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      isMobile={isMobile}
      sizes={sizes}
    >
      <div className="flex flex-col gap-4">
        <ul
          role="list"
          className={`py-8 grid grid-cols-2 gap-y-8 gap-x-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 ${showSidebar ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}
        >
          {loading ? (
            // Mostrar 8 skeletons mientras carga
            <Skeletons.Products items={8} />
          ) : products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} showSidebar={showSidebar} />
              </li>
            ))
          ) : (
            <li className="col-span-4 w-full flex flex-col items-center justify-center">
              <p className="font-medium">No se encontraron productos</p>
            </li>
          )}
        </ul>
        <Pagination
          offset={offset}
          setOffset={setOffset}
          totalProducts={totalProducts}
        />
      </div>
    </FilterArea>
  );
};

export default Products;
