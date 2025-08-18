import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SidebarItems = ({ label, link, options }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = pathname === link;

  return !options ? (
    <Link
      href={link}
      className={cn(
        `flex gap-x-2 text-sm font-medium items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`,
        isActive && "bg-slate-400/20"
      )}
    >
      {label}
    </Link>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="link" className="ml-3" >
          {label}
          {open ? (
            <ChevronDown strokeWidth={1} className="w-5 h-5" />
          ) : (
            <ChevronRight strokeWidth={1} className="w-5 h-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="flex flex-col items-center gap-2">
          {options.products?.length > 0 && (
            <span className="font-bold text-center w-full bg-gray-100 rounded-md">
              Productos
            </span>
          )}
          {options.products.map((option) => (
            <Link
              key={option.id}
              href={option.link}
              className={cn(
                `flex gap-x-2 pl-28 text-sm hover:bg-slate-300/20 p-2 cursor-pointer`,
                pathname === option.link && "bg-slate-400/20"
              )}
            >
              {option.label}
            </Link>
          ))}
          {options.featured?.length > 0 && (
            <span className="font-bold text-center w-full bg-gray-100 rounded-md">
              Destacados
            </span>
          )}
          {options.featured?.map((option) => (
            <Link
              key={option.id}
              href={option.link}
              className={cn(
                `flex gap-x-2 pl-28 text-sm hover:bg-slate-300/20 p-2 cursor-pointer`,
                pathname === option.link && "bg-slate-400/20"
              )}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SidebarItems;
