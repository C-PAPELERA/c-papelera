"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import useStore from "@/hooks/useStore";
import Image from "next/image";
import ProductTag from "./ProductTag";
import DiscountTag from "./DiscountTag";

const ProductCard = ({ product, showSidebar }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (product) => {
    addToCart({
      category: product.defaultCategoryId,
      identifier: { productId: product.id },
      isPreorder: false,
      quantity: 1,
    });
  };

  return (
    <Link
      href={`/store/products/${product.id}`}
      className="group block w-full h-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="flex flex-col items-center justify-center h-full overflow-hidden bg-gray-50/30 shadow-sm shadow-papelera/20 hover:shadow-lg transition-shadow ring-1 ring-papelera/10 rounded-lg">
        {/* Imagen */}
        <div
          className={cn(
            "relative w-[100%] aspect-square overflow-hidden bg-white",
            showSidebar && "aspect-square"
          )}
        >
          {/* Imagen principal */}
          <Image
            alt={product.seoDescription}
            src={product.originalImageUrl}
            fill
            sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className={cn(
              "object-contain px-6 pt-6 transition-transform duration-300 group-hover:scale-105",
              product.galleryImages.length > 0 && "group-hover:opacity-0"
            )}
          />

          {/* Imagen al hacer hover */}
          {product.galleryImages[0]?.imageUrl && (
            <Image
              alt={product.seoDescription}
              src={product.galleryImages[0]?.imageUrl}
              fill
              sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 25vw"
              className="object-contain px-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          )}

          {/* Ribbon */}
          {product.ribbon && (
            <ProductTag
              tag={product.ribbon}
              className="absolute top-12 left-0 z-10 rounded-r-md px-4 py-1.5 text-xs font-semibold uppercase text-white shadow-md"
            />
          )}

          {/* Descuento */}
          {product.compareToPriceDiscount && (
            <DiscountTag
              tag={`${product.compareToPriceDiscountPercentFormatted}`}
              className="absolute top-4 left-0 z-10 rounded-r-md px-5 py-1.5 text-xs font-semibold uppercase text-white shadow-md"
            />
          )}
        </div>

        {/* Info dentro de la card */}
        <div className="w-full flex flex-col flex-1 p-4 justify-between">
          <h3 className="text-sm sm:text-md font-semibold text-black line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-500 line-through">
            {product.compareToPriceFormatted}
          </p>
          <h3 className="text-[17px] font-bold text-papelera">
            {product.defaultDisplayedPriceFormatted}
          </h3>
          <button
            className="w-full mb-2 mt-3 relative flex items-center justify-center rounded-md border border-papelera bg-white py-2 text-xs md:text-sm font-medium text-papelera hover:bg-papelera/5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            Agregar al carrito<span className="sr-only">, {product.name}</span>
          </button>
          <button className="w-full mb-2 relative flex items-center justify-center rounded-md border border-transparent bg-papelera px-8 py-2 text-xs md:text-sm font-medium text-white hover:bg-papelera/95">
            Comprar<span className="sr-only">, {product.name}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
