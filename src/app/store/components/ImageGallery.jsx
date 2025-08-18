"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ galleryImages, productName }) => {
  // const [zoomStates, setZoomStates] = useState({});
  const [cursorPositions, setCursorPositions] = useState({});
  // const imgRefs = useRef({});

  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // const handleMouseMove = (index, e) => {
  //   const imgRef = imgRefs.current[index];
  //   if (!imgRef) return;

  //   const { left, top, width, height } = imgRef.getBoundingClientRect();
  //   const x = ((e.clientX - left) / width) * 100;
  //   const y = ((e.clientY - top) / height) * 100;

  //   setCursorPositions((prev) => ({
  //     ...prev,
  //     [index]: { x, y },
  //   }));
  // };

  // const toggleZoom = (index) => {
  //   setZoomStates((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

    return (
      <div className="w-full">
        <Carousel setApi={setApi} className="mx-auto max-w-xl">
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={`image-${index}`}>
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md">
                  <Image
                    src={image.imageOriginalUrl}
                    alt={`${productName} - ${index + 1}`}
                    fill
                    className="object-contain transition-transform duration-300 ease-out"
                    style={{
                      transformOrigin: cursorPositions[index]
                        ? `${cursorPositions[index].x}% ${cursorPositions[index].y}%`
                        : "center",
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-5 flex justify-center items-center gap-5">
          <ChevronLeft
            onClick={() => api && api.scrollPrev()}
            className="size-5 cursor-pointer"
            strokeWidth={1.5}
          />
          <div className="text-muted-foreground py-2 text-center text-sm">
            {current} / {count}
          </div>
          <ChevronRight
            onClick={() => api && api.scrollNext()}
            className="size-5 cursor-pointer"
            strokeWidth={1.5}
          />
        </div>
      </div>
    );
};

export default ImageGallery;
