"use client";

import Link from "next/link";
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
      <div className="flex flex-col items-center justify-center text-center h-screen gap-6">
        <h1 className="text-6xl font-bold leading-tight text-papelera">
          Página no encontrada
        </h1>
        <p className="max-w-lg text-gray-700">
          Lo sentimos, la página que estás buscando no existe o se ha
          eliminado. Aquí puedes volver a la página principal
        </p>
        <Link href="/">
          <button className="btn btn-primary bg-papelera border border-papelera text-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-papelera">
            Volver a la página principal
          </button>
        </Link>
      </div>
    </>
  );
}
