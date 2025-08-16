"use client";

// Hooks
import { useRouter } from "next/navigation";

import ProductTag from "./ProductTag";
import Image from "next/image";

const RelatedProductCard = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/store/products/${product.id}`);
  };

  return (
    <div>
      <div className="relative">
        {product.ribbon && (
          <ProductTag
            tag={product.ribbon}
            className={
              "absolute top-0 right-0 z-10 rounded-tr-lg py-1.5 px-1 text-xs font-medium uppercase leading-5 text-white"
            }
          />
        )}
        <div
          className={`relative h-[300px] w-full overflow-hidden rounded-lg bg-[rgb(251,251,251)]`}
        >
          <Image
            alt={product.seoDescription}
            src={product.originalImageUrl}
            className="size-full object-contain"
            width={500}
            height={500}
          />
        </div>
        <div
          onClick={handleClick}
          className={`cursor-pointer absolute inset-x-0 top-0 flex h-[300px] items-end justify-end overflow-hidden rounded-lg p-4`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black opacity-50"
          />
          <div className="relative w-full flex flex-col gap-2 justify-between">
            <div className="flex gap-1">
              {product.compareToPrice && (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 bg-black px-0.5">
                    <p className="text-sm text-white ">Antes</p>
                    <p className="text-sm text-white line-through">
                      {product.defaultDisplayedCompareToPriceFormatted}
                    </p>
                  </div>
                  <div className="flex gap-1 bg-black px-0.5">
                    <p className="text-sm text-white ">Ahorra</p>
                    <p className="text-sm text-white">
                      {product.compareToPriceDiscountPercentFormatted}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-base font-semibold text-white">
              {product.defaultDisplayedPriceFormatted}
            </p>
          </div>
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">REF {product.sku}</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleClick}
          className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Comprar<span className="sr-only">, {product.name}</span>
        </button>
      </div>
    </div>
  );
};

export default RelatedProductCard;
