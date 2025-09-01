import clsx from "clsx";
import { ArrowLeft, ArrowRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const limite = 60;

const Pagination = ({ offset, setOffset, totalProducts }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(totalProducts / limite);
  const currentPage = Math.floor(offset / limite) + 1;

  const updateOffset = (newOffset) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", newOffset);
    router.replace(`?${params.toString()}`);
    setOffset(newOffset);
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => {
            if (currentPage > 1) updateOffset(offset - limite);
          }}
          className="group inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-papelera hover:text-papelera"
        >
          <ArrowLeft aria-hidden="true" className="mr-2 size-5 text-gray-400 group-hover:text-papelera" />
          Anterior
        </button>
      </div>
      <div className="hidden lg:-mt-px lg:flex">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => updateOffset(index * limite)}
            className={clsx(
              index + 1 === currentPage
                ? "border-papelera text-papelera"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              "inline-flex items-center border-t-2 pt-4 px-3.5 text-sm font-medium"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => {
            if (currentPage < totalPages) updateOffset(offset + limite);
          }}
          className="group inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-papelera hover:text-papelera"
        >
          Siguiente
          <ArrowRightIcon
            aria-hidden="true"
            className="ml-2 size-5 text-gray-400 group-hover:text-papelera"
          />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
