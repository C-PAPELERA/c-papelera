"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import ProductsSearch from "./ProductsSearch";
import HamburgerMenu from "./HamburgerMenu";
import Cart from "./Cart";
import { User } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para ocultar el header menos la barra de categorias
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-papelera transition-shadow duration-300 shadow-md">
      {/* Solo visible cuando no está scrolleado */}
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden",
          scrolled ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
        )}
      >
        {/* Barra superior */}
        <Container classNameParent="bg-papelera-2">
          <div className="flex flex-col gap-y-3 xs:flex-row items-center justify-end text-papelera font-medium py-2.5">
            <div className="flex gap-6 items-center text-[14px]">
              <Link className="hover:underline" href="">Blog</Link>
              <Link className="hover:underline" href="">Nosotros</Link>
              <Link className="hover:underline" href="">Sedes</Link>
              <Link className="hover:underline" href="">Domicilios</Link>
            </div>
          </div>
        </Container>

        {/* Logo y otros */}
        <Container
          classNameParent="pt-6 pb-8"
          className="w-full flex justify-between items-end gap-10"
        >
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/assets/img/logo-full.png"
                alt="Logo Comercial Papelera"
                width="180"
                height="90"
                className="w-[250px] object-cover"
              />
            </Link>
          </div>
          <div className="justify-end flex items-center gap-2">
            <ProductsSearch />
            <div className="lg:hidden">
              <HamburgerMenu />
            </div>
            <a
              className="hidden md:block"
              href="/store/cart?store-page=account"
              rel="noopener noreferrer"
            >
              <div className="p-1.5 bg-white/90 rounded-lg">
                <User strokeWidth={1.5} className="size-5 cursor-pointer" stroke="#012F49" />
              </div>
            </a>
            <Cart />
          </div>
        </Container>
      </div>

      {/* Barra categorias siempre visible */}
      <Container classNameParent="bg-white">
        <div className="flex flex-col gap-y-3 xs:flex-row items-center justify-center text-papelera font-medium py-4">
          <div className="flex gap-16 items-center justify-between text-[15px] uppercase">
            <Link className="hover:underline" href="">Impresión en Línea</Link>
            <Link className="hover:underline" href="">Estudiantil</Link>
            <Link className="hover:underline" href="">Oficina</Link>
            <Link className="hover:underline" href="">Arte</Link>
            <Link className="hover:underline" href="">Tecnología</Link>
            <Link className="hover:underline" href="">Hogar</Link>
            <Link className="hover:underline" href="">Lectura</Link>
            <Link className="hover:underline" href="">Fiesta</Link>
            <Link className="hover:underline" href="">Snacks</Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
