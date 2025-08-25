const callouts = [
  {
    name: 'Eficiencia en cada corte',
    description: 'Destructora de Papel  ',
    imageSrc: '/assets/img/destructora-de-papel.jpg',
    imageAlt: '',
    href: '#',
  },
  {
    name: 'Mejores personalizaciones',
    description: 'Personaliza tu Mug',
    imageSrc: '/assets/img/mug-personalizado.jpg',
    imageAlt: '',
    href: '#',
  },
  {
    name: 'Descubre el artista en ti',
    description: 'Kit de Arte',
    imageSrc: '/assets/img/arte.jpg',
    imageAlt: '',
    href: '#',
  },
]

export default function CollectionsBanners() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-3xl font-bold text-papelera">Nuestros Productos</h2>
        <div className="mt-8 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
          {callouts.map((callout) => (
            <div key={callout.name} className="group relative">
              <div className="w-full rounded-lg overflow-hidden aspect-square">
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href={callout.href}>
                  <span className="absolute inset-0" />
                  {callout.name}
                </a>
              </h3>
              <p className="text-lg font-semibold text-papelera">{callout.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
