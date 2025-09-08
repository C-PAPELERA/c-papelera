"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCategories } from "@/lib/ecwid-functions"
import CartSecondary from "./CartSecondary";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = [
  { id: 187874255, name: "IMPRESIÓN EN LÍNEA" },
  { id: 187688589, name: "ESTUDIANTIL" },
  { id: 187688581, name: "OFICINA" },
  { id: 187681684, name: "ARTE" },
  { id: 187688591, name: "TECNOLOGÍA" },
  { id: 187688570, name: "HOGAR" },
  { id: 187838717, name: "LECTURA" },
  { id: 187688560, name: "FIESTA" },
  { id: 187838718, name: "SNACKS" },
  { id: 188338270, name: "MASCOTAS" },
]

export default function NavigationMenuHeader() {
  const [allSubcategories, setAllSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false);

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

  // Detectar scroll para ocultar el header menos la barra de categorias
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavigationMenu viewport={false} className="py-2.5 z-20">
        <NavigationMenuList className="flex gap-0 2xl:gap-2">
          {categories.map((category, idx) => {
            const subcats = allSubcategories.filter((sub) => sub.parentId === category.id)
            return (
              <NavigationMenuItem key={category.id} className="flex-1">
                {/* Categoría principal */}
                <NavigationMenuTrigger className="hover:underline text-center text-[13px] xl:text-[14px] uppercase text-papelera font-semibold">
                  <Link href={`/store/products?category=${category.id}&offset=0`}>
                    {category.name}
                  </Link>
                </NavigationMenuTrigger>

                {/* Subcategorías */}
                <NavigationMenuContent
                  className={`${idx >= categories.length - 3 ? "left-auto right-0" : ""}`}
                >
                  <ul className="grid w-md gap-1 grid-cols-2 p-2">
                    {loading ? (
                      <li className="text-sm text-muted-foreground">Cargando...</li>
                    ) : subcats.length > 0 ? (
                      subcats.map((sub) => (
                        <li key={sub.id}>
                          <NavigationMenuLink asChild>
                            <Link href={`/store/products?category=${sub.id}&offset=0`}>
                              {sub.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-muted-foreground">
                        Sin subcategorías
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
      {/* Carrito */}
      <div className={`flex items-center pl-4 ${scrolled ? "" : "hidden"}`}>
        <CartSecondary />
      </div>
    </>
  )
}
