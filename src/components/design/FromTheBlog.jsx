const blogs = [
  {
    name: 'Cómo Solicitar el Servicio de Impresión DTF en Nuestra Página Web',
    description: 'Personaliza tus prendas fácilmente. Aprende cómo solicitar nuestro servicio de impresión DTF y dale vida a camisetaso buzos con tus propios diseños. ¡Estampados duraderos y de alta calidad, directo desde nuestra web!',
    imageSrc: '/assets/img/entrada-blog.png',
    imageAlt: '',
    href: '#',
  },
  {
    name: 'Cómo Solicitar el Servicio de Impresión a Color en Nuestra Página Web',
    description: '¿Necesitas impresiones en alta calidad y colores vibrantes? En nuestro nuevo tutorial te enseñamos cómo solicitar el servicio de Impresión Láser a Color en nuestra página web.',
    imageSrc: '/assets/img/entrada-blog-2.jpg',
    imageAlt: '',
    href: '#',
  },
  {
    name: 'Cómo Solicitar el Servicio de Botón Publicitario en Nuestra Página Web',
    description: '¿Quieres promocionar tu marca con botones personalizados? En nuestro nuevo tutorial te mostramos cómo solicitar el servicio de Botón Publicitario en nuestra página web de forma rápida y sencilla.',
    imageSrc: '/assets/img/entrada-blog-3.png',
    imageAlt: '',
    href: '#',
  },
]

export default function CollectionsBanners() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-4xl font-bold text-papelera text-center">Nuestro Blog</h2>
        <p className="mt-4 mb-12 text-lg text-gray-600 text-center">Aprende como usar nuestros productos y servicios</p>
        <div className="mt-8 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
          {blogs.map((blog) => (
            <div key={blog.name} className="group relative">
              <div className="w-full rounded-lg overflow-hidden aspect-4/2">
                <img
                  alt={blog.imageAlt}
                  src={blog.imageSrc}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-md text-gray-500">
                <div className="flex flex-row gap-5 text-sm mb-2">
                  <p>May 5, 2025</p>
                  <p>Yullior Barrios</p>
                  <p>249 vistas</p>
                </div>
                <p className="text-xl font-semibold text-papelera mb-2">{blog.name}</p>
                <a href={blog.href}>
                  <span className="absolute inset-0" />
                  {blog.description}
                </a>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
