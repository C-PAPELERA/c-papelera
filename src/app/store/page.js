import { redirect } from "next/navigation";

export const metadata = {
  title: "Tienda",
  description:
    "Comercial Papelera",
};

export default function StorePage() {
  redirect("/store/products?category=187028062&offset=0");
}
