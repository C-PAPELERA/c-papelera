"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/design/Container";
import Head from "next/head";
import useLayoutVisibility from "@/hooks/useLayoutVisibility";
import { useEffect } from "react";

export default function NotFound() {
  const { setHideLayout } = useLayoutVisibility();

  useEffect(() => {
    setHideLayout(true);
    return () => {
      setHideLayout(false);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Página no encontrada</title>
        <meta
          name="description"
          content="Lo sentimos, la página que estás buscando no existe o se ha eliminado. Aquí puedes volver a la página principal"
        />
        <meta property="og:title" content="Página no encontrada" />
        <meta
          property="og:description"
          content="Lo sentimos, la página que estás buscando no existe o se ha eliminado. Aquí puedes volver a la página principal"
        />
        <meta property="og:image" content="/assets/img/not-found.webp" />
        <meta name="twitter:title" content="Página no encontrada" />
        <meta
          name="twitter:description"
          content="Lo sentimos, la página que estás buscando no existe o se ha eliminado. Aquí puedes volver a la página principal"
        />
        <meta name="twitter:image" content="/assets/img/not-found.webp" />
      </Head>
      <div className="-mt-35 grid lg:grid-cols-2">
        <Container
          classNameParent={"h-screen flex items-center justify-center"}
        >
          <div className="flex flex-col gap-8">
            <h1 className="text-6xl font-bold leading-tight text-pretty">
              Página no encontrada
            </h1>
            <p className="max-w-lg text-pretty text-gray-900">
              Lo sentimos, la página que estás buscando no existe o se ha
              eliminado. Aquí puedes volver a la página principal
            </p>
            <Link href="/" className="w-fit">
              <button className="btn btn-primary bg-black border border-black text-white p-2 rounded-md text-sm hover:bg-white hover:text-black">
                Volver a la página principal
              </button>
            </Link>
          </div>
        </Container>
        <div className="hidden lg:block relative h-screen w-full bg-black">
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black opacity-60" />
          <Image
            src="/assets/img/not-found.webp"
            alt=""
            className="w-full h-full object-cover"
            width={1000}
            height={1500}
            unoptimized
          />
        </div>
      </div>
    </>
  );
}
