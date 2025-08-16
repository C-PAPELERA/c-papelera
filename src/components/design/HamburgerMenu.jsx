"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { dataGeneral } from "@/constants/routes.header";
import SidebarItems from "./SidebarItems";

const HamburgerMenu = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = usePathname();

  useEffect(() => {
    setOpenNavigation(false);
  }, [navigate]);

  return (
    <Sheet open={openNavigation} onOpenChange={setOpenNavigation}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="bg-slate-400/20 !p-1.5 rounded-lg h-fit"
        >
          <MenuIcon strokeWidth={1.5} className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col h-screen">
          <nav className="text-center h-full pb-6">
            <ul className="flex flex-col items-center gap-6">
              {dataGeneral.map((item) => (
                <SidebarItems key={item.label} {...item} />
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
