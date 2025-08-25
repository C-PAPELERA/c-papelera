// Hooks
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounces";
import { useRouter } from "next/navigation";

// Utils
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

// Components
import Image from "next/image";
import Container from "./Container";
import { Button } from "../ui/button";
import { searchProducts } from "@/app/actions/store";
import ProductTag from "@/app/store/components/ProductTag";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ProductCard = ({ product, setOpen }) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/store/products/${product.id}`);
    setOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="group block w-full h-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="flex flex-col h-full overflow-hidden bg-gray-50/30 shadow-sm shadow-papelera/20 hover:shadow-lg transition-shadow ring-1 ring-papelera/10 rounded-lg">
        <div
          onClick={handleClick}
          className={cn(
            "relative w-full aspect-[4/5] overflow-hidden",
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

const ProductsSearch = () => {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);

  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const [scrolled, setScrolled] = useState(false);

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
    res.length > 5 ? setRecords(res.slice(0, 5)) : setRecords(res);
  };

  useEffect(() => {
    if (!debouncedQuery) return;

    fetchRecords(debouncedQuery);
    return;
  }, [debouncedQuery]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="link"
            className="!p-1.5 bg-white rounded-lg !h-8"
          >
            <Search strokeWidth={1.5} className="size-5 cursor-pointer" stroke="#012F49" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "!w-screen !rounded-none max-h-[100dvh] overflow-auto", scrolled ? "-mt-22 lg:-mt-9 xl:-mt-6" : "mt-6",
            records.length > 0 && "pb-42 lg:pb-10"
          )}
        >
          <Container classNameParent="bg-white py-3 lg:py-7.5">
            <div className="flex items-center gap-4">
              <Search strokeWidth={1.5} className="size-5 cursor-pointer" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full focus-visible:outline-none"
                placeholder="Buscar productos..."
              />
              <X
                strokeWidth={1.5}
                className="size-5 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            {records.length > 0 && (
              <div className="pt-10 grid xs:grid-cols-2 lg:grid-cols-5 gap-4">
                {records.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    setOpen={setOpen}
                  />
                ))}
              </div>
            )}
            {records.length === 0 && query && (
              <div className="pt-10">
                <p className="text-center text-gray-500">
                  No se encontraron resultados
                </p>
              </div>
            )}
          </Container>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProductsSearch;
