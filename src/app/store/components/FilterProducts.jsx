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

const FilterProducts = ({ categories, sizes }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* Categorias */
  const [selectedCategories, setSelectedCategories] = useState([]);

  /* Tallas */
  const [selectedSizes, setSelectedSizes] = useState([]);

  const isLoading = useRef(false);

  /* Funciones */
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

  const handleChangeSizes = (checked, size) => {
    setSelectedSizes((prevSizes) => {
      if (checked) {
        return [...prevSizes, size.filterId];
      } else {
        return prevSizes.filter((sizeId) => sizeId !== size.filterId);
      }
    });
  };

  /* useEffect */

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

    if (selectedSizes.length > 0) {
      newParams.set("option_Talla", selectedSizes.join(","));
      router.push(`?${newParams.toString()}`);
    } else if (isLoading.current) {
      newParams.delete("option_Talla");
      router.push(`?${newParams.toString()}`);
    }
  }, [selectedSizes]);

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
      {/* <AccordionItem value="sizes">
        <AccordionTrigger>Tallas</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {sizes?.length > 0 ? (
            sizes.map((size) => (
              <div className="flex items-center space-x-2" key={size.filterId}>
                <Checkbox
                  checked={selectedSizes.includes(size.filterId)}
                  onCheckedChange={(checked) =>
                    handleChangeSizes(checked, size)
                  }
                />
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {size.filterId}
                </span>
              </div>
            ))
          ) : (
            <span className="text-sm">No hay tallas</span>
          )}
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  );
};

export default FilterProducts;
