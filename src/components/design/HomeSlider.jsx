"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const items = [
  { id: 1, image: "/assets/img/banner-comercial.jpg" },
  { id: 2, image: "/assets/img/banner-comercial-2.png" },
  { id: 3, image: "/assets/img/banner-comercial-3.png" },
];

const HomeSlider = () => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState(null);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cambiar cada 8 segundos
  useEffect(() => {
    if (!api) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      api.scrollNext();
    }, 8000);
    return () => resetTimeout();
  }, [api, current]);

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      setApi={(carouselApi) => {
        if (!carouselApi) return;
        setApi(carouselApi);

        carouselApi.on("select", () => {
          setCurrent(carouselApi.selectedScrollSnap());
        });
      }}
      className="relative"
    >
      <CarouselContent className="h-[400px] md:h-[520px] 2xl:h-[680px] !-ml-0">
        {items.map((item, index) => (
          <CarouselItem
            key={item.id}
            className="relative !p-0"
          >
            <Image
              src={item.image}
              alt={`Banner ${item.id}`}
              className={`w-full h-full object-cover transition-all duration-1000`}
              width={2000}
              height={1000}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute top-1/2 left-15 md:left-20 z-10">
        <CarouselPrevious className="bg-white/80 rounded-full shadow-md hover:bg-white p-2" />
      </div>
      <div className="absolute top-1/2 right-15 md:right-20 z-10">
        <CarouselNext className="bg-white/80 rounded-full shadow-md hover:bg-white p-2" />
      </div>
    </Carousel>
  );
};

export default HomeSlider;
