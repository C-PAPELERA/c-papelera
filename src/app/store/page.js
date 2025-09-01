import { redirect } from "next/navigation";

export const metadata = {
  title: "Tienda",
  description:
    "Comercial Papelera",
};

export default function StorePage() {
  redirect("/");
}
