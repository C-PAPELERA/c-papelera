'use client'

import Image from "next/image";

const FeaturedBanners = () => {

  return (
    <section className="w-[90%] mx-auto p-6 mt-20 flex flex-col gap-4">
      <div className="flex gap-10 items-stretch">
        <div className="basis-[28%]">
          <img
            src="/assets/img/banner-termos-1.png"
            alt="Imagen izquierda"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 basis-[44%]">
          <img
            src="/assets/img/banner-hogar.png"
            alt="Imagen superior"
            className="w-full h-1/2 object-cover"
          />
          <img
            src="/assets/img/banner-oficina.png"
            alt="Imagen inferior"
            className="w-full h-1/2 object-cover"
          />
        </div>
        <div className="basis-[28%]">
          <img
            src="/assets/img/banner-termos-2.png"
            alt="Imagen derecha"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
          <img
            src="/assets/img/banner-impresion.png"
            alt="Imagen derecha"
            className="w-full h-full object-cover"
          />
        </div>
    </section>
  );
};

export default FeaturedBanners;