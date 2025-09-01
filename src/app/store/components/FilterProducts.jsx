"use client";

// Hooks
import { useRef, useState } from "react";

// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const FilterProducts = ({ categories, brands }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const isLoading = useRef(false);

  // Categorias
  const handleChangeCategories = (checked, category) => {
    setSelectedCategories((prevCategories) => {
      if (checked) {
        return [...prevCategories, category.id];
      } else {
        return prevCategories.filter(
          (categoryId) => categoryId !== category.id
        );
      }
    });
  };

  // Marcas
  const handleChangeBrands = (checked, brand) => {
    setSelectedBrands((prevBrands) => {
      if (checked) {
        return [...prevBrands, brand.filterId];
      } else {
        return prevBrands.filter((brandId) => brandId !== brand.filterId);
      }
    });
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString()); // clona los params actuales
    if (selectedCategories.length > 0) {
      newParams.set("categories", selectedCategories.join(","));
      router.push(`?${newParams.toString()}`);
    } else if (isLoading.current) {
      newParams.delete("categories");
      router.push(`?${newParams.toString()}`);
    }
  }, [selectedCategories]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString()); // clona los params actuales
    if (selectedBrands.length > 0) {
      newParams.set("attribute_Brand", selectedBrands.join(","));
      router.push(`?${newParams.toString()}`);
    } else if (isLoading.current) {
      newParams.delete("attribute_Brand");
      router.push(`?${newParams.toString()}`);
    }
  }, [selectedBrands]);

  useEffect(() => {
    if (!isLoading.current) isLoading.current = true;
  }, []);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="categories">
        <AccordionTrigger>Categorías</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <div className="flex items-center space-x-2" key={category.id}>
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleChangeCategories(checked, category)
                  }
                />
                <span className="text-sm text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category.name}
                </span>
              </div>
            ))
          ) : (
            <span className="text-sm">No hay categorías</span>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="brands">
        <AccordionTrigger>Marcas</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {brands?.length > 0 ? (
            brands.map((brand) => (
              <div className="flex items-center space-x-2" key={brand.filterId}>
                <Checkbox
                  checked={selectedBrands.includes(brand.filterId)}
                  onCheckedChange={(checked) =>
                    handleChangeBrands(checked, brand)
                  }
                />
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {brand.filterId}
                </span>
              </div>
            ))
          ) : (
            <span className="text-sm">No hay marcas</span>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterProducts;
