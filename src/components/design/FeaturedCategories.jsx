"use client";

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/ecwid-functions";
import ProductCard from "../../app/store/components/ProductCard";
import { useEffect, useState, useRef } from "react";

// Categorías principales
const featuredCategories = [
  {
    id: 187492035, // 187874255
    title: "Impresión en línea",
    image: "/assets/svg/impresion.svg",
    link: "/store/products?category=187874255&offset=0",
    color: "bg-[#012f49]",
  },
  {
    id: 187688581,
    title: "Oficina",
    image: "/assets/svg/oficina.svg",
    link: "/store/products?category=187688581&offset=0",
    color: "bg-[#1484e0]",
  },
  {
    id: 187688589,
    title: "Estudiantil",
    image: "/assets/svg/estudiantil.svg",
    link: "/store/products?category=187688589&offset=0",
    color: "bg-[#7de0a0]",
  },
  {
    id: 187688591,
    title: "Tecnología",
    image: "/assets/svg/tecnologia.svg",
    link: "/store/products?category=187688591&offset=0",
    color: "bg-[#42c0ef]",
  },
  {
    id: 187681684,
    title: "Arte",
    image: "/assets/svg/arte.svg",
    link: "/store/products?category=187681684&offset=0",
    color: "bg-[#3ecdd8]",
  },
  {
    id: 187688560,
    title: "Fiesta",
    image: "/assets/svg/fiesta.svg",
    link: "/store/products?category=187688560&offset=0",
    color: "bg-[#ea4e61]",
  },
  {
    id: 187688570,
    title: "Hogar",
    image: "/assets/svg/hogar.svg",
    link: "/store/products?category=187688570&offset=0",
    color: "bg-[#ffb703]",
  },
  {
    id: 187492035, // 187838717
    title: "Lectura",
    image: "/assets/svg/lectura.svg",
    link: "/store/products?category=187838717&offset=0",
    color: "bg-[#239fdd]",
  },
  {
    id: 187492035, // 187838718
    title: "Snacks",
    image: "/assets/svg/snacks.svg",
    link: "/store/products?category=187838718&offset=0",
    color: "bg-[#ed684a]",
  },
  {
    id: 187492035, // 188338270
    title: "Mascotas",
    image: "/assets/svg/mascotas.svg",
    link: "/store/products?category=188338270&offset=0",
    color: "bg-[#9585be]",
  },
];

export default function FeaturedCategories({ initialProducts, initialCategory }) {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState(initialCategory);

  // Cache productos por categoria
  const [cache, setCache] = useState({ [initialCategory]: initialProducts });
  const hoverTimeout = useRef(null);

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

  const handleMouseEnter = (catId) => {
    hoverTimeout.current = setTimeout(() => {
      setCategory(catId);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  return (
    <>
      <h3 className="flex items-center justify-center text-2xl xs:text-3xl font-semibold text-papelera">
        Comprar Por Categoría
      </h3>
      <div className="w-full grid grid-cols-2 xs:grid-cols-5 2xl:grid-cols-10 gap-x-0 gap-y-8 mt-10">
        {featuredCategories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.link}
            aria-label={cat.title}
            onMouseEnter={() => handleMouseEnter(cat.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="group hover:scale-105 transition-all duration-300 flex flex-col items-center">
              <div
                className={`${cat.color} rounded-full shadow-sm group-hover:shadow-md transition-all w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-5`}
              >
                <Image
                  alt={cat.title}
                  src={cat.image}
                  width={100}
                  height={100}
                  className="size-[75px] group-hover:scale-110 duration-300 transition-transform"
                />
              </div>
              <p className="text-[15px] font-medium text-papelera mt-3 text-center uppercase">
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
            className={`py-4 grid grid-cols-2 gap-y-8 gap-x-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-4`}
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
