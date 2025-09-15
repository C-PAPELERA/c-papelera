
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const promoBanners = [
  { id: 1, img: "/assets/img/banner-superior.png", url: "/store/products?category=188328263&offset=0" },
  { id: 2, img: "/assets/img/banner-superior-2.png", url: "/store/products?category=188328264&offset=0" },
];

const PromoSlider = () => {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className="h-[30px] md:h-[35px] lg:h-[40px] xl:h-[51px] relative w-full border-y border-white/90">
        {promoBanners.map((banner) => (
          <CarouselItem key={banner.id} className="p-0 basis-full">
            <Link href={banner.url} className="block w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={banner.img}
                  alt="banner promocional"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default PromoSlider