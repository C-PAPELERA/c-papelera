// Hooks
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounces";

// Utils
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

// Components
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { Button } from "../ui/button";
import { searchProducts } from "@/app/actions/store";
import ProductTag from "@/app/store/components/ProductTag";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ProductCard = ({ product, setOpen }) => {
  return (
    <Link
      href={`/store/products/${product.id}`}
      onClick={() => setOpen(false)}
      className="flex flex-col gap-4 items-center"
    >
      <div className="group relative w-full aspect-[3/5] rounded-lg ring-1 ring-gray-900/5 hover:ring-gray-900/10 overflow-hidden">
        <Image
          alt={product.seoDescription}
          src={product.hdThumbnailUrl}
          width={500}
          height={500}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-500 opacity-100 rounded-md",
            product.galleryImages.length > 0 && "group-hover:opacity-0"
          )}
        />
        {product.galleryImages[0]?.imageUrl && (
          <Image
            alt={product.seoDescription}
            src={product.galleryImages[0]?.hdThumbnailUrl}
            width={500}
            height={500}
            className="absolute inset-0 size-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            //className="absolute inset-0 size-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
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
          className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black opacity-40"
        />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-center text-sm font-medium text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {product.defaultDisplayedPriceFormatted}
        </p>
      </div>
    </Link>
  );
};

const ProductsSearch = () => {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);

  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

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
            "!w-screen !rounded-none mt-6 max-h-[100dvh] overflow-auto",
            records.length > 0 && "pb-42 lg:pb-10"
          )}
        >
          <Container classNameParent="bg-white py-4">
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
