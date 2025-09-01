"use client";

import { Check, ChevronsUpDown } from "lucide-react";

// Hooks
import { useState } from "react";
import { cn } from "@/lib/utils";

// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  {
    value: "RELEVANCE",
    label: "Recomendados",
  },
  {
    value: "ADDED_TIME_DESC",
    label: "Nuevas opciones",
  },
  {
    value: "PRICE_ASC",
    label: "Precio: Del más bajo al más alto",
  },
  {
    value: "PRICE_DESC",
    label: "Precio: Del más alto al más bajo",
  },
  {
    value: "NAME_ASC",
    label: "Nombre: A a la Z",
  },
  {
    value: "NAME_DESC",
    label: "Nombre: Z a la A",
  },
];

const SortProducts = ({ setOffset }) => {
  const [value, setValue] = useState("RELEVANCE");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (currentValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentValue === value) {
      params.delete("sortBy");
    } else {
      params.set("sortBy", currentValue); // agregar sortBy al params
    }

    // resetear offset
    setOffset(0);
    params.set("offset", 0);
    router.replace(`?${params.toString()}`);

    setValue(currentValue === value ? "RELEVANCE" : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-1">
          <label className="hidden sm:block text-sm">Ordenar por</label>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            <span className="hidden sm:block truncate max-w-[150px]">
              {value
                ? options.find((option) => option.value === value)?.label
                : "Ordenar por..."}
            </span>
            <span className="sm:hidden truncate max-w-[150px]">
              Ordenar por...
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar opciones..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontró ninguna opción.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className={"cursor-pointer"}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SortProducts;
