"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Image from "next/image";
import ProductTag from "./ProductTag";

const ProductCard = ({ product, showSidebar }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/store/products/${product.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group block w-full h-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="flex flex-col h-full overflow-hidden bg-white/80 shadow-sm hover:shadow-lg transition-shadow">
        <div
          onClick={handleClick}
          className={cn(
            "relative w-full aspect-[4/5] overflow-hidden",
            showSidebar ? "h-[240px] sm:h-[300px] lg:h-[400px]" : "h-[300px]"
          )}
        //className={`cursor-pointer group relative h-full w-full overflow-hidden rounded-lg`}
        >
          {/* Imagen principal */}
          <Image
            alt={product.seoDescription}
            src={product.originalImageUrl}
            width={500}
            height={500}
            className={cn(
              "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-100 p-8",
              product.galleryImages.length > 0 && "group-hover:opacity-0"
            )}
          />
          {/* Imagen al hacer hover */}
          {product.galleryImages[0]?.imageUrl && (
            <Image
              alt={product.seoDescription}
              src={product.galleryImages[0]?.imageUrl}
              width={500}
              height={500}
              className="absolute inset-0 size-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            />
          )}
          {product.ribbon && (
            <ProductTag
              tag={product.ribbon}
              className={
                "absolute top-2 left-2 z-10 rounded-md px-2 py-1 text-xs font-semibold uppercase text-white shadow-md"
              }
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20"
          />
        </div>

        {/* Info dentro de la card */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-sm sm:text-md font-semibold text-black line-clamp-2">
            {product.name}
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">REF {product.sku}</p> */}
          <h3 className="mt-1 text-[16px] font-bold text-papelera">
            {product.defaultDisplayedPriceFormatted}
          </h3>
        </div>

        {/* <button
        onClick={handleClick}
        className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-papelera px-8 py-2 text-sm font-medium text-white hover:bg-papelera/90"
      >
        Comprar<span className="sr-only">, {product.name}</span>
      </button> */}
      </div>
    </button>
  );
};

export default ProductCard;
