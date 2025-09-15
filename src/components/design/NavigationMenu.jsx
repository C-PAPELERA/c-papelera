"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { getCategories } from "@/lib/ecwid-functions"
import CartSecondary from "./CartSecondary";
import Image from "next/image";

const categories = [
  { id: 187874255, name: "IMPRESIÓN EN LÍNEA", img: "/assets/img/impresion-en-linea.jpg" },
  { id: 187688589, name: "ESTUDIANTIL", img: "/assets/img/estudiantil.jpg" },
  { id: 187688581, name: "OFICINA", img: "/assets/img/oficina.jpg" },
  { id: 187681684, name: "ARTE", img: "/assets/img/arte-2.jpg" },
  { id: 187688591, name: "TECNOLOGÍA", img: "/assets/img/tecnologia.jpg" },
  { id: 187688570, name: "HOGAR", img: "/assets/img/hogar.jpg" },
  { id: 187838717, name: "LECTURA", img: "/assets/img/lectura.jpg" },
  { id: 187688560, name: "FIESTA", img: "/assets/img/fiesta.jpg" },
  { id: 187838718, name: "SNACKS", img: "/assets/img/snacks.jpg" },
  { id: 188338270, name: "MASCOTAS", img: "/assets/img/mascotas.jpg" },
]

export default function NavigationMenuHeader() {
  const [allSubcategories, setAllSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState(null)
  const navRef = useRef(null)
  const panelRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    async function loadAllSubcategories() {
      try {
        let all = []
        let offset = 0
        const limit = 100
        let keepFetching = true

        // Convertir ids en string separado por coma
        const parentIds = categories.map((category) => category.id).join(",")

        while (keepFetching) {
          const items = await getCategories({ query: { parentIds, offset, limit } })
          if (items && items.length > 0) {
            all = [...all, ...items]
            offset += limit
            keepFetching = items.length === limit
          } else {
            keepFetching = false
          }
        }

        setAllSubcategories(all)
      } catch (err) {
        console.error("Error cargando subcategorías", err)
      } finally {
        setLoading(false)
      }
    }

    loadAllSubcategories()
  }, [])

  // Scroll para mostrar carrito
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openNow = (id) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenCategory(id)
  }

  const closeDelayed = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = window.setTimeout(() => setOpenCategory(null), 300)
  }

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const activeCategory = categories.find(c => c.id === openCategory)
  const activeSubcats = openCategory
    ? allSubcategories.filter((s) => s.parentId === openCategory)
    : []

  return (
    <div ref={navRef} className="relative z-30">
      {/* Categorias principales */}
      <nav className="flex items-center justify-between w-full py-2">
        <div className="flex-1 flex gap-2 xl:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="px-3 py-2"
              onMouseEnter={() => openNow(cat.id)}
              onMouseLeave={closeDelayed}
            >
              <Link
                href={`/store/products?category=${cat.id}&offset=0`}
                onFocus={() => openNow(cat.id)}
                onClick={closeDelayed}
                className="uppercase text-[13px] xl:text-[14px] font-semibold text-papelera hover:underline"
              >
                {cat.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Carrito secundario cuando hay scroll */}
        <div className={`flex items-center pl-4 ${scrolled ? "" : "hidden"}`}>
          <CartSecondary />
        </div>
      </nav>

      {/* Mega menu */}
      {openCategory !== null && (
        <div
          ref={panelRef}
          onMouseEnter={cancelClose}
          onMouseLeave={closeDelayed}
          className={`fixed top-16 inset-x-0 z-40 bg-white shadow-lg border-t transition-all duration-150 pt-5 pb-10 ${scrolled ? "-mt-2" : "mt-35"}`}
        >
          <div className="max-w-7xl mx-auto p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="col-span-2 md:col-span-2 lg:col-span-4">
              {loading ? (
                <div className="text-sm text-muted-foreground">Cargando...</div>
              ) : activeSubcats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {activeSubcats.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/store/products?category=${sub.id}&offset=0`}
                      className="block text-sm py-1 hover:text-papelera hover:underline"
                      onClick={closeDelayed}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Sin categorías</div>
              )}
            </div>
            <Image
              src={activeCategory.img}
              alt="categoria"
              width={500}
              height={500}
              className="aspect-auto object-cover rounded-sm"
            />
          </div>
        </div>
      )}
    </div>
  )
}
