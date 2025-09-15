
import Link from "next/link";
import Image from "next/image";

const navigation = {
  customer_service: [
    { name: 'Horario: 6:00AM a 10:00PM', href: '#' },
    { name: 'Domicilios: Bogotá D.C. y a Nivel Nacional', href: '#' },
    { name: 'Teléfono: 601-2150623', href: '#' },
  ],
  company: [
    { name: 'Nuestras Sedes', href: '#' },
    { name: 'Domicilios', href: '#' },
  ],
  legal: [
    { name: 'Términos y Condiciones', href: '#' },
    { name: 'Política de Protección de Datos Personales', href: '#' },
    { name: 'Términos y Condiciones del Servicio de Impresión en Línea', href: '#' },
    { name: 'Aviso de Privacidad', href: '#' },
    { name: 'Política de Cookies', href: '#' },
    { name: 'Contacte con Nosotros', href: '#' },
    { name: 'Ley 1116', href: '#' },

  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/cpapelera24h',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/cpapelera24h/?hl=es',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/comercial-papelera/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 448 512" {...props}>
          <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-48.3 62.9-48.3 67.2 0 79.7 61.9 79.7 142.3V416z" />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-papelera dark:bg-gray-900">
      <div className="mx-auto max-w-[95%] md:max-w-[85%] px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-24">
        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-3 xl:gap-16">
          {/* Columna izquierda */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 xl:col-span-2 items-start">
            {/* Logo */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block">
                <Image
                  src="/assets/img/logo-icon.png"
                  alt="Logo Comercial Papelera"
                  width={90}
                  height={45}
                  className="w-[100px] xl:w-[120px] object-contain"
                />
              </Link>
            </div>

            {/* Enlaces */}
            <div className="md:col-span-4 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm/6 font-semibold text-white dark:text-white">Atención al cliente</h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.customer_service.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        className="text-sm/6 text-white hover:text-white dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm/6 font-semibold text-white dark:text-white">Nuestra Compañía</h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-white hover:text-white dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm/6 font-semibold text-white dark:text-white">Información legal</h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-white hover:text-white dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div>
            <h3 className="text-sm/6 font-medium text-white dark:text-white">Suscribirse</h3>
            <p className="mt-2 text-sm/6 text-white dark:text-gray-400">
              Obtén las últimas noticias y ofertas
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Dirección de correo
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                placeholder="Dirección de correo"
                autoComplete="email"
                className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:w-64 sm:text-sm/6 xl:w-full dark:bg-white/5 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
              />
            </form>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 border-t border-gray-900/10 sm:mt-14 md:flex md:items-center md:justify-between lg:mt-24 dark:border-white/10">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-white/80 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-white md:order-1 md:mt-0 dark:text-gray-400">
            &copy; Copyright © 2025 Comercial Papelera 24 Horas - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
