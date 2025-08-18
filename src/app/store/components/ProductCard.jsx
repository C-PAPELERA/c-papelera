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
    <div className="flex flex-col gap-4 h-full">
      <div
        onClick={handleClick}
        className={cn(
          "overflow-hidden transition-all duration-500 relative rounded-lg group cursor-pointer",
          showSidebar ? "h-[240px] sm:h-[300px] lg:h-[400px]" : "h-[420px]"
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
            "absolute transition-opacity duration-500 opacity-100 size-full object-contain",
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
              "absolute top-0 right-0 z-10 rounded-tr-lg py-1.5 px-1.5 leading-none font-medium uppercase text-white"
            }
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black opacity-5"
        />
      </div>
      <div className="relative mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">REF {product.sku}</p>
        <h3 className="mt-1 text-sm font-medium text-gray-900">
          {product.defaultDisplayedPriceFormatted}
        </h3>
      </div>
      <button
        onClick={handleClick}
        className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-papelera px-8 py-2 text-sm font-medium text-white hover:bg-papelera/90"
      >
        Comprar<span className="sr-only">, {product.name}</span>
      </button>
    </div>
  );
};

export default ProductCard;
