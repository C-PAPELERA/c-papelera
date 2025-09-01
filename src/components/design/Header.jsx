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
import NavigationMenu from "./NavigationMenu";

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
    <header className="fixed top-0 z-50 w-full bg-papelera transition-shadow duration-300 shadow-sm">
      {/* Solo visible cuando no está scrolleado */}
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden",
          scrolled ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
        )}
      >
        {/* Barra superior */}
        <Container classNameParent="bg-white">
          <div className="flex flex-col gap-y-3 xs:flex-row items-center justify-end text-papelera font-medium py-2.5">
            <div className="flex gap-6 items-center text-[15px]">
              <Link className="hover:underline" href="">Blog</Link>
              <Link className="hover:underline" href="">Nosotros</Link>
              <Link className="hover:underline" href="">Sedes</Link>
              <Link className="hover:underline" href="">Domicilios</Link>
            </div>
          </div>
        </Container>

        {/* Logo y otros */}
        <Container
          classNameParent="py-7 !bg-papelera"
          className="w-full flex justify-between items-center gap-10"
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
              className="hidden lg:block"
              href="/store/cart?store-page=account"
              rel="noopener noreferrer"
            >
              <div className="p-1.5 bg-white rounded-lg">
                <User strokeWidth={1.5} className="size-5 cursor-pointer" stroke="#012F49" />
              </div>
            </a>
            <Cart />
          </div>
        </Container>
      </div>

      {/* Barra categorias siempre visible */}
      <Container classNameParent="bg-white hidden lg:block" className="w-full flex justify-center">
        <NavigationMenu />
      </Container>

      {/* Barra inferior */}
      <div className="relative w-full bg-[#E53187] border-y border-white/20">
        {/* <img
          src="/assets/img/producto-del-mes.png"
          alt="banner superior"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        /> */}
        <Link href="/store/products?category=187677637&offset=0" className="relative z-10 block">
          <p className="text-white text-sm md:text-[16px] text-center py-2">
            Producto del Mes <strong>25% OFF</strong> ahorra $45.900
          </p>
        </Link>
      </div>

    </header>
  );
};

export default Header;
