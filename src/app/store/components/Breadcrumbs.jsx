"use client";

import Link from "next/link";

const Breadcrumbs = ({ categories }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ul role="list" className="flex flex-wrap items-center space-x-2 gap-y-2">
        <li>
          <div>
            <Link
              href={"/"}
              className="text-sm font-medium text-gray-500 hover:text-papelera"
            >
              TIENDA
            </Link>
          </div>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-300"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={
                  category.id === 187874254
                    ? "/store/brands"
                    : `/store/products?category=${category.id}&offset=0`
                }
                className="ml-1 text-sm font-medium text-gray-500 hover:text-papelera"
              >
                {category.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
