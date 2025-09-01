export default function PromoBanners() {
  return (
    <div className="w-full my-20">
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="group relative aspect-2/1 overflow-hidden rounded-lg sm:row-span-2 sm:aspect-square">
          <img
            alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
            src="/assets/img/termos-stanley.jpg"
            className="absolute size-full object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50" />
          <div className="absolute inset-0 flex items-end p-6">
            <div>
              <h3 className="font-semibold text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  TERMOS STANLEY
                </a>
              </h3>
              <p aria-hidden="true" className="mt-1 text-sm text-white">
                Diferentes colores
              </p>
            </div>
          </div>
        </div>
        <div className="group relative aspect-2/1 overflow-hidden rounded-lg sm:aspect-auto">
          <img
            alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
            src="/assets/img/juicer-banner.webp"
            className="absolute size-full object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50" />
          <div className="absolute inset-0 flex items-end p-6">
            <div>
              <h3 className="font-semibold text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                    EQUIPA TU HOGAR
                </a>
              </h3>
              <p aria-hidden="true" className="mt-1 text-sm text-white">
                Los mejores electrodomesticos
              </p>
            </div>
          </div>
        </div>
        <div className="group relative aspect-2/1 overflow-hidden rounded-lg sm:aspect-auto">
          <img
            alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
            src="/assets/img/implementos-oficina.jpg"
            className="absolute size-full object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50" />
          <div className="absolute inset-0 flex items-end p-6">
            <div>
              <h3 className="font-semibold text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  PARA TU OFICINA
                </a>
              </h3>
              <p aria-hidden="true" className="mt-1 text-sm text-white">
                Los mejores implementos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}