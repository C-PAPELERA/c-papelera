// components/FeaturedProductItem.tsx
import Image from "next/image";
import Link from "next/link";

const FeaturedProductItem = ({ product }) => {
  return (
    <div key={product.title}>
      <Link href={product.link} className="relative group">
        <div className="relative h-[450px] md:h-[600px] w-full overflow-hidden rounded-md">
          <Image
            alt={product.title}
            src={product.image}
            width={500}
            height={1000}
            className="size-full object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <div className="cursor-pointer absolute inset-x-0 top-0 flex h-[450px] md:h-[600px] items-end justify-end overflow-hidden rounded-md p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black opacity-70"
          />
          <div className="relative w-full flex flex-col items-center justify-center gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-2xl font-semibold text-white text-center">
              {product.title}
            </p>
            <button className="w-1/2 flex items-center bg-white justify-center border border-white rounded-md py-2 px-4 hover:bg-transparent hover:text-white">
              <span className="text-sm font-semibold">Comprar</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductItem;
