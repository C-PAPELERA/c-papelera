import Link from "next/link";
import Image from "next/image";
import HomeSlider from "@/components/design/HomeSlider";
import Container from "@/components/design/Container";
import FeaturedProducts from "@/components/design/FeaturedProducts";
import FeaturedBanners from "@/components/design/FeaturedBanners";
import Footer from "@/components/design/Footer";

const featuredCategories = [
  {
    title: "Impresión en línea",
    image:
      "/assets/svg/impresion.svg",
    link: "/store",
    color: "bg-white/80",
  },
  {
    title: "Oficina",
    image:
      "/assets/svg/stapler-remover.svg",
    link: "/store",
    color: "bg-white/80",
  },
  {
    title: "Estudiantil",
    image:
      "/assets/svg/backpack.svg",
    link: "/store",
    color: "bg-white/80",
  },
  {
    title: "Tecnología",
    image:
      "/assets/svg/sound.svg",
    link: "/store",
    color: "bg-white/80",
  },
  {
    title: "Arte",
    image:
      "/assets/svg/paint-palette.svg",
    link: "/store",
    color: "bg-white/80",
  },
  {
    title: "Fiesta",
    image:
      "/assets/svg/balloon.svg",
    link: "/store/products/726057533",
    color: "bg-white/80",
  },
  {
    title: "Hogar",
    image:
      "/assets/svg/clean-house.svg",
    link: "/store",
    color: "bg-white/80",
  },
  {
    title: "Lectura",
    image:
      "/assets/svg/open-book.svg",
    link: "/store",
    color: "bg-white/80",
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
    size: 'w-18 h-18',
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
    size: 'w-18 h-18',
    description: 'Haz tus pedidos',
  },
]

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="w-full bg-papelera-2">
      <HomeSlider />
      <Container
        className={"pt-20 pb-20 flex flex-col gap-4 items-center justify-center"}
      >
        <h3 className="text-2xl xs:text-3xl font-semibold text-papelera">
          Comprar por categoría
        </h3>
        {/* Categorías principales */}
        <div className="w-[85%] grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-8 gap-x-0 gap-y-8 mt-10">
          {featuredCategories.map((category) => (
            <Link key={category.title} href={category.link} aria-label={category.title}>
              <div className="group hover:scale-105 transition-all flex flex-col items-center">
                <div className={`${category.color} rounded-full border-1 border-papelera/80 shadow-sm group-hover:border-papelera group-hover:shadow-md transition-all w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-5`}>
                  <Image
                    alt={category.title}
                    src={category.image}
                    width={60}
                    height={60}
                    className="size-[50px] sm:size-[55px] lg:size-[50px] group-hover:scale-110 transition-transform"
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
          <FeaturedProducts limit={8} query={{ "category": 187492035 }} />
        </div>

        {/* Banners diseño */}
        <FeaturedBanners />

        {/* Productos destacados */}
        <h3 className="text-2xl xs:text-3xl font-semibold text-papelera mt-15">
          Los mejores productos
        </h3>
        <FeaturedProducts limit={4} query={{ "category": 187492030 }} />

        {/* Productos destacados */}
        <h3 className="text-2xl xs:text-3xl font-semibold text-papelera mt-15">
          Los más vendidos
        </h3>
        <FeaturedProducts limit={4} query={{ "category": 187493532 }} />

        {/* Caracteristicas  */}
        <div className="pt-50">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-20 w-full">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="flex flex-col items-center justify-center p-6"
              >
                <img alt="" src={perk.imageUrl} className={`mb-4 ${perk.size}`} />
                <h3 className="text-lg text-center font-medium text-gray-900">{perk.name}</h3>
                <p className="mt-1 text-md text-gray-500 text-center">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>


      </Container>

      <Footer />
    </div>
  );
}
