
import Container from "@/components/design/Container";
import { getCategories } from "@/lib/ecwid-functions";

const Brands = async () => {

  // Obtener marcas
  const brands = await getCategories({ query: { parent: 187874254 } });  

  return (
    <Container
      className={"w-[85%] pt-20 pb-40 lg:pb-60 flex flex-col gap-4 items-center justify-center"}
    >
      <div className="w-full">
        <h2 className="text-4xl font-bold text-papelera">Nuestras Marcas</h2>
        <p className="mt-3 mb-12 text-lg text-gray-600">Compra con tus marcas favoritas.</p>
        <div className="mt-8 space-y-12 grid grid-cols-2 gap-x-4 md:grid-cols-3 xl:grid-cols-5 lg:space-y-0 lg:gap-x-6 lg:gap-y-8 xl:gap-y-10">
          {brands.map((brand) => (
            <div key={brand.name} className="group relative">
              <div className="w-full rounded-lg overflow-hidden aspect-4/3 ring-1 ring-papelera/10 p-10">
                <img
                  alt={brand.name}
                  src={brand.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-sm text-gray-500">
                <p className="text-md lg:text-lg font-semibold text-papelera mb-1">{brand.name}</p>
                <a href={`/store/products?category=${brand.id}&offset=0`}>
                  <span className="absolute inset-0" />
                  {brand.productCount} productos
                </a>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Brands;