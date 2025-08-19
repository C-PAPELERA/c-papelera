"use client";

import { useState } from "react";
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

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      setApi={(api) => {
        if (!api) return;
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap());
        });
      }}
      className="pt-3 relative"
    >
      <CarouselContent className="h-[400px] md:h-[520px] 2xl:h-[660px] !-ml-0">
        {items.map((item, index) => (
          <CarouselItem
            key={item.id}
            className="relative basis-[85%] !p-1.5"
          >
            <Image
              src={item.image}
              alt={`Banner ${item.id}`}
              className={`w-full h-full object-cover transition-all duration-1000
                ${index === current ? "opacity-100" : "opacity-25"}`}
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
