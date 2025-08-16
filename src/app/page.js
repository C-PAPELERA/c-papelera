import Link from "next/link";
import Image from "next/image";
import HomeSlider from "@/components/design/HomeSlider";
import Container from "@/components/design/Container";
import FeaturedCategories from "@/components/design/FeaturedCategories";
import { Button } from "@/components/ui/button";
import FeaturedProductItem from "@/components/design/FeaturedProductItem";

// const featuredProducts = [ 
//   {
//     title: "Category 1",
//     image:
//       "url",
//     link: "/store/products/737407817",
//   },
//   {
//     title: "Category 2",
//     image:
//       "url",
//     link: "/store/products/726057533",
//   },
//   {
//     title: "Category 3",
//     image:
//       "url",
//     link: "/store/products?category=173576013&offset=0",
//   },
//   {
//     title: "Category 4",
//     image:
//       "url",
//     link: "/store/products?category=173769001&offset=0",
//   },
// ];

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <HomeSlider />
      <Container
        className={"pt-20 pb-20 flex flex-col gap-4 items-center justify-center"}
      >
        <h3 className="text-4xl xs:text-5xl font-bold text-papelera">
          CATEGORIAS
        </h3>
        {/* <div className="w-full grid xs:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <FeaturedProductItem key={product.title} product={product} />
          ))}
        </div>
        <Button className={"mt-5"} href={"/store?category=152427171&offset=0"}>
          <span className="text-sm font-semibold">VER TODAS LAS CATEGORIAS</span>
        </Button> */}
      </Container>
      {/* <FeaturedCategories /> */}
    </>
  );
}
