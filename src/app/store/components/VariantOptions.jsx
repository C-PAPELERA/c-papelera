function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sortSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const VariantOptions = ({
  combinations,
  selectedSize,
  setSelectedSize,
  setStock,
  setSku,
}) => {
  /* Sizes options */
  const sizes = combinations
    .map((item) => {
      return {
        sku: item.sku,
        inStock: item.inStock,
        quantity: item.quantity,
        ...item.options[0],
      };
    })
    .sort((a, b) => {
      return sortSizes.indexOf(a.value) - sortSizes.indexOf(b.value);
    });

  return (
    <div>
      <fieldset aria-label="Choose a size">
        <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-5 sm:max-w-lg gap-3">
          {sizes.map((size) => (
            <label
              key={size.value}
              className={classNames(
                "cursor-pointer flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50",
                selectedSize === size.value &&
                  "!bg-black text-white border-transparent",
                !size.inStock && "!cursor-not-allowed opacity-25"
              )}
            >
              <input
                type="radio"
                name="size"
                value={size.value}
                checked={selectedSize === size.value}
                onChange={() => {
                  setSelectedSize(size.value);
                  setStock(size.quantity);
                  setSku(size.sku);
                }}
                disabled={!size.inStock}
                className="sr-only"
              />
              {size.value}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default VariantOptions;
