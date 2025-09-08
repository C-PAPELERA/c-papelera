
// Características
const features = [
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

export default function StoreFeatures() {
  return (
    <div className="mt-15 mb-25">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 md:gap-20 lg:gap-35">
          {features.map((feauture) => (
            <div
              key={feauture.name}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-26 h-26 rounded-full bg-gray-100/80 mb-5 p-5">
                <img
                  alt={feauture.name}
                  src={feauture.imageUrl}
                  className={`h-6 w-6 object-contain ${feauture.size}`}
                />
              </div>
              <h3 className="text-md font-semibold text-gray-900">{feauture.name}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {feauture.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
