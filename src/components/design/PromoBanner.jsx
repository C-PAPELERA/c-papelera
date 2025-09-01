
export default function PromoBanner() {
  return (
    <div className="bg-white w-full pt-10">
      <div aria-hidden="true" className="relative">
        <img
          alt=""
          src="/assets/img/banner-destructora.jpg"
          className="h-96 w-full object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white" />
      </div>

      <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-4xl font-bold tracking-tight text-papelera sm:text-4xl">¡Llévate la destructora ideal para tu oficina!</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Diseñadas para brindarte seguridad, eficiencia y capacidad según tus necesidades. Desde tareas personales hasta uso intensivo en oficina, tenemos la destructora perfecta para ti.
          </p>
        </div>
      </div>
    </div>
  )
}
