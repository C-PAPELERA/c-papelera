"use client";

import { useEffect, useRef, useState } from "react";

export default function EcwidCheckout({ storeId, cartId }) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);
  const containerRef = useRef(null);
  const initTimeoutRef = useRef(null);
  const mountId = useRef(Math.random().toString(36).substr(2, 9)); // ID único para esta instancia

  const addDebugInfo = (message) => {
    console.log(`[EcwidCheckout-${mountId.current}] ${message}`);
    setDebugInfo((prev) => [
      ...prev.slice(-4),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  useEffect(() => {
    addDebugInfo("Component mounted, starting initialization");

    setIsReady(false);
    setIsLoading(true);
    setError(null);

    // Limpiar timeout anterior
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
    }

    const initializeEcwid = () => {
      addDebugInfo("Starting Ecwid initialization");

      try {
        // 1. Configurar localStorage sin manipular DOM
        const checkout = {
          id: cartId,
          itemsCount: 0,
        };
        localStorage.setItem(
          `ec-${storeId}-checkout`,
          JSON.stringify(checkout)
        );
        addDebugInfo("localStorage configured");

        // 2. Configurar variables globales de Ecwid (sin tocar DOM)
        window.ec = window.ec || {};
        window.ec.config = window.ec.config || {};
        window.ec.config.storefrontUrls = {
          cleanUrls: true,
          queryBasedCleanUrls: true,
        };

        window.ec.storefront = window.ec.storefront || {};
        window.ec.storefront.show_breadcrumbs = false;
        window.ec.storefront.show_footer_menu = false;

        window.ecwid_script_defer = true;
        window.ecwid_dynamic_widgets = true;

        addDebugInfo("Global variables configured");

        // 3. Función para configurar el store (sin manipular DOM existente)
        const setupStore = () => {
          addDebugInfo("Setting up Ecwid store");

          if (typeof window.Ecwid === "undefined") {
            addDebugInfo("Ecwid not available, will retry");
            initTimeoutRef.current = setTimeout(setupStore, 1000);
            return;
          }

          try {
            // Solo limpiar nuestro contenedor específico, sin tocar otros elementos
            const container = containerRef.current;
            if (container) {
              container.innerHTML = `<div style="padding: 20px; text-align: center; color: #666;">Initializing store...</div>`;
              addDebugInfo("Container cleared safely");
            }

            // Configurar eventos si no existen ya
            const setupEvents = () => {
              try {
                if (window.Ecwid.OnPageSwitch) {
                  // NO removeAll - solo agregar nuestro handler
                  window.Ecwid.OnPageSwitch.add((page) => {
                    addDebugInfo(`Page switch: ${page.type}`);

                    if (page.type === "ORDER_CONFIRMATION" && page.orderId) {
                      document.cookie = "cartId=; Max-Age=0";
                    }

                    if (page.type === "CATEGORY") {
                      window.Ecwid.openPage("cart");
                      return true;
                    }
                  });
                  addDebugInfo("Page switch events configured");
                }
              } catch (eventError) {
                addDebugInfo(`Event setup error: ${eventError.message}`);
              }
            };

            // Crear el store browser
            const createBrowser = () => {
              addDebugInfo("Creating product browser");

              try {
                // Usar un ID único para evitar conflictos
                const uniqueId = `ecStoreProductBrowser_${mountId.current}`;

                if (containerRef.current) {
                  containerRef.current.id = uniqueId;
                  containerRef.current.innerHTML = "";
                }

                window.xProductBrowser(
                  "categoriesPerRow=3",
                  "views=grid(3,3) list(10) table(20)",
                  "categoryView=grid",
                  "searchView=list",
                  `id=${uniqueId}`
                );

                addDebugInfo("Product browser created successfully");

                // Verificar resultado después de un tiempo
                setTimeout(() => {
                  const container = document.getElementById(uniqueId);
                  const hasContent =
                    container &&
                    (container.children.length > 0 ||
                      container.innerHTML.trim().length > 100);

                  if (hasContent) {
                    addDebugInfo("Store verification: SUCCESS");
                    setIsReady(true);
                    setIsLoading(false);
                    setError(null);
                  } else {
                    addDebugInfo(
                      "Store verification: FAILED - no content detected"
                    );
                    setError("Store failed to load content");
                    setIsLoading(false);
                  }
                }, 4000);
              } catch (browserError) {
                addDebugInfo(`Browser creation error: ${browserError.message}`);
                setError(`Failed to create store: ${browserError.message}`);
                setIsLoading(false);
              }
            };

            // Configurar eventos primero
            setupEvents();

            // Verificar si la API está lista
            if (window.Ecwid.isApiLoaded && window.Ecwid.isApiLoaded()) {
              addDebugInfo("API already loaded, creating browser immediately");
              createBrowser();
            } else if (window.Ecwid.OnAPILoaded) {
              addDebugInfo("Waiting for API to load");
              // NO removeAll - solo agregar nuestro callback
              window.Ecwid.OnAPILoaded.add(() => {
                addDebugInfo("API loaded callback triggered");
                createBrowser();
              });
            } else {
              addDebugInfo("OnAPILoaded not available, trying direct creation");
              setTimeout(createBrowser, 1000);
            }
          } catch (setupError) {
            addDebugInfo(`Setup error: ${setupError.message}`);
            setError(`Setup failed: ${setupError.message}`);
            setIsLoading(false);
          }
        };

        // 4. Cargar script solo si no existe (SIN remover el existente)
        const loadScriptIfNeeded = () => {
          const existingScript = document.getElementById("ecwid-script");

          if (existingScript) {
            addDebugInfo("Script already exists, proceeding with setup");
            setTimeout(setupStore, 500);
          } else {
            addDebugInfo("Creating new script");

            if (!document.body) {
              addDebugInfo("document.body not ready, waiting...");
              setTimeout(loadScriptIfNeeded, 100);
              return;
            }

            try {
              const script = document.createElement("script");
              script.id = "ecwid-script";
              script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=nextjs_commerce&storefront-v3=true&t=${Date.now()}`;
              script.async = true;

              script.onload = () => {
                addDebugInfo("New script loaded successfully");
                setTimeout(setupStore, 500);
              };

              script.onerror = () => {
                addDebugInfo("Script failed to load");
                setError("Failed to load Ecwid script");
                setIsLoading(false);
              };

              document.body.appendChild(script);
              addDebugInfo("Script element created and added");
            } catch (scriptError) {
              addDebugInfo(`Script creation error: ${scriptError.message}`);
              setError(`Script error: ${scriptError.message}`);
              setIsLoading(false);
            }
          }
        };

        // Iniciar proceso
        loadScriptIfNeeded();
      } catch (mainError) {
        addDebugInfo(`Main initialization error: ${mainError.message}`);
        setError(`Initialization failed: ${mainError.message}`);
        setIsLoading(false);
      }
    };

    // Pequeño delay para asegurar que el componente esté completamente montado
    initTimeoutRef.current = setTimeout(initializeEcwid, 200);

    // Cleanup function
    return () => {
      addDebugInfo("Component unmounting, cleaning up");
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, [storeId, cartId]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Debug Info Panel */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "12px",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Debug Info (Instance: {mountId.current}):
        </div>
        {debugInfo.map((info, index) => (
          <div key={index} style={{ color: "#666", marginBottom: "2px" }}>
            {info}
          </div>
        ))}
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            color: "#d32f2f",
            backgroundColor: "#ffebee",
            padding: "12px",
            border: "1px solid #f5c6cb",
            marginBottom: "10px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        id="ecStoreProductBrowser"
        style={{
          minHeight: "400px",
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: isReady ? "#ffffff" : "#fafafa",
          transition: "background-color 0.3s ease",
        }}
      >
        {isLoading && !isReady && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#666",
            }}
          >
            <div style={{ fontSize: "18px", marginBottom: "15px" }}>
              Loading Ecwid Store...
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div
        style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}
      >
        Status:{" "}
        {isReady
          ? "✅ Ready"
          : isLoading
          ? "🔄 Loading"
          : error
          ? "❌ Error"
          : "⏳ Initializing"}
      </div>
    </div>
  );
}
