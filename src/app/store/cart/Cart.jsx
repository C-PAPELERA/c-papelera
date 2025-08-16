// "use client";

// import Skeletons from "@/components/design/Skeletons";
// import useStore from "@/hooks/useStore";
// import { useEffect, useRef, useState } from "react";

// const Cart = () => {
//   const { cart, setCart, updateCart } = useStore();
//   const [isLoading, setIsLoading] = useState(true);
//   const effectRan = useRef(false);
//   const eventAttached = useRef(false); // para evitar múltiples listeners

//   const updateCartStore = () => {
//     return new Promise((resolve) => {
//       if (cart.length > 0 && !effectRan.current) {
//         cart.forEach((item) => {
//           window.Ecwid.Cart.addProduct(item);
//         });

//         effectRan.current = true;

//         setTimeout(() => {
//           resolve();
//         }, 1000); // espera para asegurar que los productos se agreguen
//       } else {
//         resolve(); // no hay productos
//       }
//     });
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://app.shopsettings.com/script.js?88425088&data_platform=code&data_date=2025-03-07";
//     script.async = true;
//     script.dataset.cfasync = "true";
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.xProductBrowser) {
//         window.xProductBrowser(
//           "views=cart(300),checkout(300)",
//           "id=my-store-88425088"
//         );
//       }

//       if (window.Ecwid) {
//         window.Ecwid.OnAPILoaded.add(function () {
//           window.Ecwid.openPage("cart");

//           window.Ecwid.OnPageSwitch.add(function (page) {
//             if (page.type === "PRODUCT") {
//               window.location.href = `/store/products/${page.productId}`;
//               return false;
//             }
//           });

//           // Opciones visuales
//           window.ec = window.ec || {};
//           window.ec.storefront = window.ec.storefront || {};
//           window.ec.storefront.show_footer_menu = false;
//           window.ec.storefront.show_breadcrumbs = false;
//           window.Ecwid.refreshConfig && window.Ecwid.refreshConfig();

//           // Actualiza productos y registra evento
//           updateCartStore().then(() => {
//             setIsLoading(false);
//           });
//         });
//       }
//     };

//     /* return () => {
//       try {
//         window.Ecwid.Cart.get(function (cart) {
//           setCart(
//             cart.items.map((item) => ({
//               id: item.product.id,
//               quantity: item.quantity,
//               options: item.options,
//             }))
//           );
//           updateCart(cart);
//         });
//         window.Ecwid.Cart.clear();
//       } catch (e) {
//         console.warn("Error al limpiar Ecwid.Cart:", e);
//       }
//       document.body.removeChild(script);
//     }; */
//   }, []);

//   return (
//     <div
//       id="my-store-88425088"
//       style={{ visibility: isLoading ? "hidden" : "visible" }}
//     />
//   );
// };

// export default Cart;
