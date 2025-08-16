import Script from "next/script";
import { cookies } from "next/headers";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Carrito de compras",
  description: "Revisa los productos que estás a punto de comprar.",
};

export default async function Page() {
  const storeId = process.env.ECWID_STORE_ID;
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  return (
    <>
      <div className="pt-10">
        <div id="ecStoreProductBrowser">
          <div className="flex items-center justify-center h-[60vh]">
            <p>Cargando carrito...</p>
            <Loader2 className="animate-spin" />
          </div>
        </div>
      </div>
      <Script id="ecStoreProductBrowser-script">
        {`
        console.log('Inicio de ecStoreProductBrowser-script');
        let checkout = {
          id: '${cartId}',
          itemsCount: 0
        }

        localStorage.setItem('ec-${storeId}-checkout', JSON.stringify(checkout));
        let ecwidLoaded = false;

        function load_ecwid() {
          console.log('Inicio de load_ecwid');
          if (typeof Ecwid != 'undefined') {
            Ecwid.OnAPILoaded.add(function () {
              if (!ecwidLoaded) {
                console.log('Ecwid loaded');
                ecwidLoaded = true;
                xProductBrowser("categoriesPerRow=3", "views=grid(3,3) list(10) table(20)", "categoryView=grid", "searchView=list", "id=ecStoreProductBrowser");
              }
            });

            Ecwid.OnPageSwitch.add(function (page) {
              let is_cart_page = page.type == 'CART';
              let is_download_error_page = page.type == 'DOWNLOAD_ERROR';
              let is_checkout_page = page.type.indexOf('CHECKOUT_') >= 0;
              let is_order_page = page.type.indexOf('ORDER_') >= 0;

              if (page.type == 'ORDER_CONFIRMATION' && page.orderId) {
                document.cookie = 'cartId=';
              }

              if (page.type == 'CATEGORY') {
                Ecwid.openPage('cart');
                return true;
              }
            });
          }
        }

        window.ec = window.ec || {};
        window.ec.config = window.ec.config || {};
        window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
        window.ec.config.storefrontUrls.cleanUrls = true;
        window.ec.config.storefrontUrls.queryBasedCleanUrls = true;

        window.ec.storefront = window.ec.storefront || {};
        window.ec.storefront.show_breadcrumbs = false;
        window.ec.storefront.show_footer_menu = false;

        window.ecwid_script_defer = true;
        window.ecwid_dynamic_widgets = true;

        if (!document.getElementById('ecwid-script')) {
          console.log('Ecwid script not found');
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://app.ecwid.com/script.js?${storeId}&data_platform=nextjs_commerce&storefront-v3=true';
          script.id = 'ecwid-script'
          script.onload = load_ecwid
          document.body.appendChild(script);
        } else {
          console.log('Ecwid script found');
          load_ecwid()
        }`}
      </Script>
    </>
  );
}

/* import { cookies } from "next/headers";
import EcwidCheckout from "../components/EcwidCheckout";

export const metadata = {
  title: "Carrito de compras",
  description: "Revisa los productos que estás a punto de comprar.",
};

export default async function Page() {
  const storeId = process.env.ECWID_STORE_ID;
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">Checkout</h1>
      <EcwidCheckout storeId={storeId} cartId={cartId} />
    </>
  );
} */
