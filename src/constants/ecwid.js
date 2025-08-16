export const ECWID_API_URL = "https://app.ecwid.com/api/v3/";
export const ECWID_STOREFRONT_API_URL =
  "https://app.ecwid.com/storefront/api/v1/";

export const MAIN_CATEGORY = 187028062; // Categoría raíz (Tienda)

export const isObject = (object) => {
  return (
    typeof object === "object" && object !== null && !Array.isArray(object)
  );
};

function findError(error) {
  if (Object.prototype.toString.call(error) === "[object Error]") {
    return true;
  }
  const prototype = Object.getPrototypeOf(error);
  return prototype === null ? false : findError(prototype);
}

export const isEcwidError = (error) => {
  if (!isObject(error)) return false;
  if (error instanceof Error) return true;
  return findError(error);
};

export const TAGS = {
  collections: "collections",
  products: "products",
  pages: "pages",
  cart: "cart",
  profile: "profile",
};
