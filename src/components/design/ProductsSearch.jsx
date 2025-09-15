'use client'

// Hooks
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounces";
import { useIsMobile } from "@/hooks/use-mobile";

// Utils
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

// Components
import Container from "./Container";
import { Button } from "../ui/button";
import { searchProducts } from "@/app/actions/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "../../app/store/components/ProductCard";

const ProductsSearch = () => {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchRecords = async (text) => {
    const res = await searchProducts(text);
    res.items.length > 5 ? setRecords(res.items.slice(0, 5)) : setRecords(res.items);
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setRecords([]);
      if (!isMobile) setOpen(false);
      return;
    }
    fetchRecords(debouncedQuery);
    setOpen(true);
  }, [debouncedQuery]);;

  useEffect(() => {
    if (!open) {
      setQuery("");
      setRecords([]);
    }
  }, [open]);

  return (
    <>
      {!isMobile && (
        <div className="relative">
          <Search
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500"
          />
          {/* Barra de busqueda desktop */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            className="w-full pl-10 pr-30 rounded-lg h-9 bg-white text-sm focus-visible:outline-none"
            placeholder="¿Qué necesita hoy?..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/store/products?category=187028062&offset=0&keyword=${query}`);
                setOpen(false);
              }
            }}
          />
          {query && (
            <X
              strokeWidth={1.5}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-4 cursor-pointer text-gray-500"
              onClick={() => setOpen(false)}
            />
          )}
        </div>
      )}
      <Popover open={open}>
        <PopoverTrigger asChild>
          {isMobile ? (
            // Boton de busqueda mobile
            <Button
              variant="link"
              className="!p-1.5 bg-white rounded-lg !h-8"
              onClick={() => setOpen(!open)}
            >
              <Search strokeWidth={1.5} className="size-5 cursor-pointer" stroke="#012F49" />
            </Button>
          ) : (
            // Trigger vacio
            <span></span>
          )}
        </PopoverTrigger>
        <PopoverContent
          sideOffset={scrolled ? isMobile ? -80 : -40 : isMobile ? 36 : 52}
          className={cn(
            "!w-screen !rounded-none max-h-[100dvh] overflow-auto",
            records.length > 0 && "pb-42 lg:pb-5"
          )}
          onOpenAutoFocus={(e) => {
            if (!isMobile) e.preventDefault()
          }}
        >
          <Container classNameParent="bg-white py-3 lg:py-7.5">
            {isMobile ? (
              // Buscador interno mobile
              <div className="flex items-center gap-4">
                <Search
                  strokeWidth={1.5}
                  className="size-5 cursor-pointer"
                  onClick={() => {
                    if (query) {
                      router.push(`/store/products?category=187028062&offset=0&keyword=${query}`);
                      setOpen(false);
                    }
                  }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                    if (!value) {
                      setRecords([]);
                    }
                  }}
                  className="w-full focus-visible:outline-none"
                  placeholder="Buscar productos..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(`/store/products?category=187028062&offset=0&keyword=${query}`);
                      setOpen(false);
                    }
                  }}
                />
                <X
                  strokeWidth={1.5}
                  className="size-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            ) : (
              <X
                strokeWidth={1.5}
                className="size-5 cursor-pointer absolute top-4 right-8"
                onClick={() => setOpen(false)}
              />
            )}
            {records.length > 0 && (
              <div className="pt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {records.map((product) => (
                  <div key={product.id} onClick={() => setOpen(false)}>
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  </div>
                ))}
              </div>
            )}
            {records.length === 0 && query && (
              <div className="py-10">
                <p className="text-center text-gray-500">
                  No se encontraron resultados
                </p>
              </div>
            )}
            {records.length == 5 && query && (
              <div className="flex items-center justify-center pt-10">
                <Link
                  href={`/store/products?category=187028062&offset=0&keyword=${query}`}
                  onClick={() => setOpen(false)}
                  className="mt-4 relative flex items-center justify-center rounded-md bg-white px-6 py-2 text-md font-medium text-papelera hover:underline hover:bg-gray-50"
                >
                  Ver todos los resultados
                </Link>
              </div>
            )}
          </Container>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProductsSearch;
