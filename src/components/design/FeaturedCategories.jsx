"use client";

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/ecwid-functions";
import ProductCard from "../../app/store/components/ProductCard";
import { useEffect, useState } from "react";

// Categorías principales
const featuredCategories = [
  {
    id: 187492035, // 187874255
    title: "Impresión en línea",
    image: "/assets/svg/impresion.svg",
    link: "/store/products?category=187874255&offset=0",
    color: "bg-blue-500/40",
  },
  {
    id: 187688581,
    title: "Oficina",
    image: "/assets/svg/stapler-remover.svg",
    link: "/store/products?category=187688581&offset=0",
    color: "bg-indigo-500/40",
  },
  {
    id: 187688589,
    title: "Estudiantil",
    image: "/assets/svg/backpack.svg",
    link: "/store/products?category=187688589&offset=0",
    color: "bg-orange-500/40",
  },
  {
    id: 187688591,
    title: "Tecnología",
    image: "/assets/svg/sound.svg",
    link: "/store/products?category=187688591&offset=0",
    color: "bg-cyan-500/40",
  },
  {
    id: 187681684,
    title: "Arte",
    image: "/assets/svg/paint-palette.svg",
    link: "/store/products?category=187681684&offset=0",
    color: "bg-emerald-500/40",
  },
  {
    id: 187688560,
    title: "Fiesta",
    image: "/assets/svg/balloon.svg",
    link: "/store/products?category=187688560&offset=0",
    color: "bg-red-500/40",
  },
  {
    id: 187688570,
    title: "Hogar",
    image: "/assets/svg/clean-house.svg",
    link: "/store/products?category=187688570&offset=0",
    color: "bg-yellow-500/40",
  },
  {
    id: 187492035, // 187838717
    title: "Lectura",
    image: "/assets/svg/open-book.svg",
    link: "/store/products?category=187838717&offset=0",
    color: "bg-purple-500/40",
  },
];

export default function FeaturedCategories({ initialProducts, initialCategory }) {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState(initialCategory);

  // Cache productos por categoria
  const [cache, setCache] = useState({ [initialCategory]: initialProducts });

  useEffect(() => {
    // Si ya existe en el cache
    if (cache[category]) {
      setProducts(cache[category]);
      return;
    }

    // Fetch y guardar
    async function fetchProducts() {
      const fetched = await getProducts({
        query: { category, limit: 10 },
      });
      setProducts(fetched);
      setCache((prev) => ({ ...prev, [category]: fetched }));
    }

    if (category) { fetchProducts() }
  }, [category, cache]);

  return (
    <>
      <h3 className="flex items-center justify-center text-2xl xs:text-3xl font-semibold text-papelera">
        Comprar por categoría
      </h3>
      <div className="w-full grid grid-cols-2 xs:grid-cols-4 xl:grid-cols-8 gap-x-0 gap-y-8 mt-10">
        {featuredCategories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.link}
            aria-label={cat.title}
            onMouseEnter={() => setCategory(cat.id)}
          >
            <div className="group hover:scale-105 transition-all duration-300 flex flex-col items-center">
              <div
                className={`${cat.color} rounded-full border-1 border-papelera/80 shadow-sm group-hover:border-papelera group-hover:shadow-md transition-all w-24 h-24 sm:w-30 sm:h-30 flex items-center justify-center p-5`}
              >
                <Image
                  alt={cat.title}
                  src={cat.image}
                  width={60}
                  height={60}
                  className="size-[50px] sm:size-[55px] lg:size-[55px] group-hover:scale-110 duration-300 transition-transform"
                />
              </div>
              <p className="text-sm font-medium text-papelera mt-3 text-center">
                {cat.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Productos destacados */}
      <div className="w-full mt-10">
        <div className="flex flex-col gap-4">
          <ul
            role="list"
            className={`py-4 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-4`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
