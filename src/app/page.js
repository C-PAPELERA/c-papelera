import HomeSlider from "@/components/design/HomeSlider";
import Container from "@/components/design/Container";
import FeaturedProducts from "@/components/design/FeaturedProducts";
import PromoBanners from "@/components/design/PromoBanners";
import CollectionsBanners from "@/components/design/CollectionsBanners";
import PromoBanner from "@/components/design/PromoBanner";
import FromTheBlog from "@/components/design/FromTheBlog";
import StoreFeatures from "@/components/design/StoreFeatures";
import FeaturedCategories from "@/components/design/FeaturedCategories";
import { getProducts } from "@/lib/ecwid-functions";

export const dynamic = "force-static";

export default async function Home() {

  // Productos destacados iniciales
  const initialCategory = 187492035;
  const initialProducts = await getProducts({ query: { category: initialCategory, limit: 10 } });

  return (
    <div className="w-full">

      {/* Slider */}
      <HomeSlider />

      <Container className={"w-[85%] pt-20 pb-20 flex flex-col gap-4 items-center justify-center"}>

        {/* Categorías principales */}
        <FeaturedCategories initialProducts={initialProducts} initialCategory={initialCategory} />

        {/* Banners diseño grandes */}
        <PromoBanners />

        {/* Productos destacados 2 */}
        <h3 className="self-start text-2xl xs:text-3xl font-semibold text-papelera mt-15">Los Mejores Productos</h3>
        <FeaturedProducts limit={5} query={{ "category": 187616293 }} />

        {/* Productos destacados 3 */}
        <h3 className="self-start text-2xl xs:text-3xl font-semibold text-papelera mt-25">Los Más Vendidos</h3>
        <FeaturedProducts limit={5} query={{ "category": 187677636 }} />

        {/* Colecciones o categorías diseño */}
        <CollectionsBanners />

        {/* Promo banner categoria */}
        <PromoBanner />

        {/* Productos del promo banner categoria */}
        <div className="-mt-15 flex items-center justify-center">
          <FeaturedProducts limit={3} query={{ "category": 187677637 }} />
        </div>

        {/* Blog */}
        <FromTheBlog />

        {/* Características de la tienda */}
        <StoreFeatures />

      </Container>
    </div>
  );
}
