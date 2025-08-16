"use client";

import { useEffect, useState, memo, useMemo } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Container from "./Container";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationOptions = ({ menuOptions }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el popover al cambiar la ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Memoiza el contenido de productos y destacados
  const productLinks = useMemo(
    () =>
      menuOptions.options?.products?.map((option) => (
        <Link
          key={option.id}
          href={option.link}
          className="text-sm hover:underline"
          onClick={() => setOpen(false)}
        >
          {option.label}
        </Link>
      )),
    [menuOptions.options?.products]
  );

  const featuredLinks = useMemo(
    () =>
      menuOptions.options?.featured?.map((option) => (
        <Link
          key={option.id}
          href={option.link}
          className="text-sm"
          onClick={() => setOpen(false)}
        >
          {option.label}
        </Link>
      )),
    [menuOptions.options?.featured]
  );

  const ImageGrid = memo(({ images }) => {
    if (!images?.length) return null;

    return (
      <div className="col-span-2 flex gap-4 items-start justify-between lg:justify-around">
        {images.map((image) => (
          <div className="w-80 h-[500px] shrink-0" key={image.id}>
            <Image
              src={image.link}
              width={320}
              height={500}
              className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
              alt=""
              onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
            />
          </div>
        ))}
      </div>
    );
  });

  // Agregar un nombre de display explícito
  ImageGrid.displayName = "ImageGrid";

  return (
    <>
      {menuOptions && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              className="text-sm !p-0 !h-fit !leading-none"
            >
              {menuOptions.label}{" "}
              <ChevronDown
                strokeWidth={1}
                className={cn("w-5 h-5", open && "rotate-180")}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="!w-screen !rounded-none mt-7">
            <Container classNameParent="bg-white py-5">
              <div className="grid grid-cols-3">
                <div className="flex gap-4 items-start justify-between lg:justify-around">
                  {menuOptions.options?.products && (
                    <div className="flex flex-col gap-4 items-center pb-3">
                      <h3 className="font-bold text-gray-900">Productos</h3>
                      {productLinks}
                    </div>
                  )}
                  {menuOptions.options?.featured && (
                    <div className="flex flex-col gap-4 items-center pb-3">
                      <h3 className="font-bold text-gray-900">Destacados</h3>
                      {featuredLinks}
                    </div>
                  )}
                </div>

                <ImageGrid images={menuOptions.options?.images} />
              </div>
            </Container>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default NavigationOptions;
