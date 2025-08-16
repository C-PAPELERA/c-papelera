import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const items = [
  {
    id: 1,
    image:
      "/assets/img/banner-comercial.jpg",
    component: (
      <Container
        classNameParent={
          "absolute top-0 left-0 size-full flex items-center justify-center"
        }
        className={"w-full flex flex-col gap-2 items-start"}
      >
        <div className="flex flex-col gap-1 items-center md:items-start">
          {/* <Image
            src="url"
            alt="Product 1"
            className="w-60 md:w-full"
            width={700}
            height={700}
          /> */}
          {/* <Link
            href="/test"
            className="md:ml-30 flex items-center bg-white justify-center border border-white rounded-md py-2 px-4 hover:bg-transparent hover:text-white"
          >
            <span className="text-sm md:text-lg font-medium">
              Product 1
            </span>
          </Link> */}
        </div>
      </Container>
    ),
  },
];

const HomeSlider = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent className={"h-[400px] md:h-[700px] !w-full !-ml-0"}>
          {items.map((item) => (
            <CarouselItem key={item.id} className={"relative !p-0"}>
              {item.component}
              <Image
                src={item.image}
                alt={item.id}
                className="w-full h-full object-cover"
                width={2000}
                height={1000}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute w-[70%] sm:w-[80%] lg:w-[90%] mx-auto top-1/2 left-2 right-4 flex items-center justify-between">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
