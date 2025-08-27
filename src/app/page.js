import Link from "next/link";
import Image from "next/image";
import HomeSlider from "@/components/design/HomeSlider";
import Container from "@/components/design/Container";
import FeaturedProducts from "@/components/design/FeaturedProducts";
import Footer from "@/components/design/Footer";
import PromoBanners from "@/components/design/PromoBanners";
import CollectionsBanners from "@/components/design/CollectionsBanners";
import PromoBanner from "@/components/design/PromoBanner";

const featuredCategories = [
  {
    title: "Impresión en línea",
    image:
      "/assets/svg/impresion.svg",
    link: "/store/products?category=187028062&offset=0",
    color: "bg-blue-500/40",
  },
  {
    title: "Oficina",
    image:
      "/assets/svg/stapler-remover.svg",
    link: "/store/products?category=187688581&offset=0",
    color: "bg-indigo-500/40",
  },
  {
    title: "Estudiantil",
    image:
      "/assets/svg/backpack.svg",
    link: "/store/products?category=187688589&offset=0",
    color: "bg-orange-500/40",
  },
  {
    title: "Tecnología",
    image:
      "/assets/svg/sound.svg",
    link: "/store/products?category=187688591&offset=0",
    color: "bg-cyan-500/40",
  },
  {
    title: "Arte",
    image:
      "/assets/svg/paint-palette.svg",
    link: "/store/products?category=187681684&offset=0",
    color: "bg-emerald-500/40",
  },
  {
    title: "Fiesta",
    image:
      "/assets/svg/balloon.svg",
    link: "/store/products?category=187688560&offset=0",
    color: "bg-red-500/40",
  },
  {
    title: "Hogar",
    image:
      "/assets/svg/clean-house.svg",
    link: "/store/products?category=187688570&offset=0",
    color: "bg-yellow-500/40",
  },
  {
    title: "Lectura",
    image:
      "/assets/svg/open-book.svg",
    link: "/store/products?category=187028062&offset=0",
    color: "bg-purple-500/40",
  },
];

const perks = [
  {
    name: 'Envíos a domicilio',
    imageUrl: '/assets/svg/envios.svg',
    size: 'w-20 h-20',
    description: 'Todos los días',
  },
  {
    name: 'Compra Online',
    imageUrl: '/assets/svg/compra-online.svg',
    size: 'w-16 h-16',
    description: 'Retira en nuestras tiendas',
  },
  {
    name: 'Atención al Cliente',
    imageUrl: '/assets/svg/atencion-cliente.svg',
    size: 'w-18 h-18',
    description: 'Llámanos al 601-2150623',
  },
  {
    name: 'Compra fácil y rápido',
    imageUrl: '/assets/svg/compra-facil.svg',
    size: 'w-16 h-16',
    description: 'Haz tus pedidos',
  },
]

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="w-full">
      <HomeSlider />
      <Container
        className={"w-[85%] pt-20 pb-20 flex flex-col gap-4 items-center justify-center"}
      >
        <h3 className="flex items-center justify-center text-2xl xs:text-3xl font-semibold text-papelera">
          Comprar por categoría
        </h3>
        {/* Categorías principales */}
        <div className="w-full grid grid-cols-2 xs:grid-cols-4 xl:grid-cols-8 gap-x-0 gap-y-8 mt-10">
          {featuredCategories.map((category) => (
            <Link key={category.title} href={category.link} aria-label={category.title}>
              <div className="group hover:scale-105 transition-all duration-300 flex flex-col items-center">
                <div className={`${category.color} rounded-full border-1 border-papelera/80 shadow-sm group-hover:border-papelera group-hover:shadow-md transition-all w-24 h-24 sm:w-30 sm:h-30 flex items-center justify-center p-5`}>
                  <Image
                    alt={category.title}
                    src={category.image}
                    width={60}
                    height={60}
                    className="size-[50px] sm:size-[55px] lg:size-[55px] group-hover:scale-110 duration-300 transition-transform"
                  />
                </div>
                <p className="text-sm font-medium text-papelera mt-3 text-center">
                  {category.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Productos destacados */}
        <div className="mt-20 flex items-center justify-center">
          <FeaturedProducts limit={10} query={{ "category": 187492035 }} />
        </div>

        {/* Banners diseño */}
        <PromoBanners />

        {/* Productos destacados */}
        <h3 className="self-start text-2xl xs:text-3xl font-semibold text-papelera mt-15">
          Los Mejores Productos
        </h3>
        <FeaturedProducts limit={5} query={{ "category": 187616293 }} />

        {/* Productos destacados */}
        <h3 className="self-start text-2xl xs:text-3xl font-semibold text-papelera mt-25">
          Los Más Vendidos
        </h3>
        <FeaturedProducts limit={5} query={{ "category": 187677636 }} />

        {/* Colecciones diseño */}
        <CollectionsBanners />

        {/* Promo banner */}
        <PromoBanner />

        {/* Productos destacados */}
        <div className="-mt-15 flex items-center justify-center">
          <FeaturedProducts limit={3} query={{ "category": 187677637 }} />
        </div>

        {/* Características */}
        <div className="pt-40 pb-2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-25">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100/80 mb-5 p-5">
                    <img
                      alt={perk.name}
                      src={perk.imageUrl}
                      className={`h-8 w-8 object-contain ${perk.size}`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{perk.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>

      <Footer />
    </div>
  );
}
