import "./globals.css";
import { Rubik  } from "next/font/google";
import { LayoutVisibilityProvider } from "@/context/LayoutVisibilityContext";
import { Toaster } from "@/components/ui/sonner";
import LayoutWithVisibility from "@/components/design/LayoutWithVisibility";
import { StoreProvider } from "@/context/StoreContext";
import SideCart from "@/components/design/SideCart";

const rubik = Rubik ({
  variable: "--font-rubik",
  subsets: ["latin"]
});

export const metadata = {
  title: "Comercial Papelera",
  description:
    "Comercial Papelera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon explícito */}
        <link rel="icon" href="/assets/img/logo-icon.png" type="image/png" />
        {/* Otras versiones opcionales para compatibilidad */}
        <link rel="shortcut icon" href="/assets/img/logo-icon.png" />
      </head>
      <body className={`${rubik.variable} antialiased app-container`}>
        <LayoutVisibilityProvider>
          <StoreProvider>
            <LayoutWithVisibility>
              <main className="">{children}</main>
              {/* Carrito lateral global */}
              <SideCart />
            </LayoutWithVisibility>
          </StoreProvider>
          <Toaster richColors closeButton />
        </LayoutVisibilityProvider>
      </body>
    </html>
  );
}
