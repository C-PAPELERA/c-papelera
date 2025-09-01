import { useState } from "react";
import { Funnel, FunnelX } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Breadcrumbs from "./Breadcrumbs";
import FilterProducts from "./FilterProducts";
import SortProducts from "./SortProducts";

const FilterArea = ({
  setOffset,
  breadcrumbs,
  categories,
  brands,
  showSidebar,
  setShowSidebar,
  isMobile,
  children,
}) => {
  const isMobile2 = useIsMobile(640);

  /* Sort products */
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    if (!isMobile) {
      return setShowSidebar(!showSidebar);
    }

    return setOpen(!open);
  };

  return (
    <div className="flex">
      {/* Sidebar animado (siempre montado) */}
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger />
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <div className="flex flex-col h-screen px-6">
              <FilterProducts categories={categories} brands={brands} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={`
          hidden sm:block transition-all duration-500 ease-in-out overflow-hidden
          border-r pt-5
          ${showSidebar ? "w-64 opacity-100 pr-4" : "w-0 opacity-0"}
        `}
          style={{ transitionProperty: "width, opacity, padding" }}
        >
          <div
            className={`transition-opacity duration-300 ${
              showSidebar ? "opacity-100" : "opacity-0"
            }`}
          >
            <FilterProducts categories={categories} brands={brands} />
          </div>
        </div>
      )}

      {/* Contenido principal desplazado */}
      <div
        className={`flex-1 px-4 transition-all duration-700 ease-in-out ${
          showSidebar ? "ml-0" : "ml-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          {isMobile2 && <Breadcrumbs categories={breadcrumbs} />}

          <div className="flex justify-between items-end">
            <div className="flex flex-wrap gap-1 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-fit hover:px-2"
                onClick={toggleSidebar}
              >
                {showSidebar ? <FunnelX /> : <Funnel />}
                <span className="text-sm font-medium">Filtros</span>
              </Button>
              {!isMobile2 && (
                <Separator
                  orientation="vertical"
                  className="hidden sm:block mx-2 !h-4"
                />
              )}
              {!isMobile2 && (
                <div className="hidden sm:block">
                  <Breadcrumbs categories={breadcrumbs} />
                </div>
              )}
            </div>
            <SortProducts setOffset={setOffset} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilterArea;
