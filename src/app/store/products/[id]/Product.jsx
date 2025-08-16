"use client";

import clsx from "clsx";
import { Loader2 } from "lucide-react";

// Hooks
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";

// Components
import Head from "next/head";
import Script from "next/script";
import Container from "@/components/design/Container";
import Skeletons from "@/components/design/Skeletons";
import Breadcrumbs from "../../components/Breadcrumbs";
import ImageGallery from "../../components/ImageGallery";
import RelatedProducts from "../../components/RelatedProducts";
import ProductTag from "../../components/ProductTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VariantOptions from "@/app/store/components/VariantOptions";
import CertificationTable from "../../components/CertificationTable";
import SizeGuide from "../../components/SizeGuide";
//import { addToCartAction } from "@/app/actions/store";
import useStore from "@/hooks/useStore";

const parseHtmlListToObject = (text) => {
  const regex = /<li id="(.*?)">(.*?)<\/li>/gs;

  const result = {};
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [, key, value] = match;
    result[key] = value.trim();
  }

  return result;
};

const RelatedProductsSection = ({ product }) => {
  return (
    <div className="py-10 flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Productos relacionados
      </h2>
      <RelatedProducts productIds={product.relatedProducts.productIds} />
    </div>
  );
};

const Product = ({ productRes, breadcrumbs, params }) => {
  // Hooks general
  const quantityRef = useRef();
  const isMobile = useIsMobile(1024);
  const isMobile2 = useIsMobile(768);
  const [error, setError] = useState({});
  const [stock, setStock] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Hooks products
  const [sku, setSku] = useState(null);
  const [product, setProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [additionalFeatures, setAdditionalFeatures] = useState(null);
  const { addToCart } = useStore();

  const handleProduct = () => {
    setProduct(productRes);
    setAdditionalFeatures(parseHtmlListToObject(productRes.description));
    setSku(productRes.sku);
    setStock(productRes.stock);
  };

  useEffect(() => {
    handleProduct();
  }, [params]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setError({});

    if (!selectedSize) {
      setError({
        type: "size",
        message: "Por favor especifique sus opciones",
      });

      setIsAddedToCart(false);
      return;
    }

    const quantity = Number(quantityRef.current.value) || 1;

    // Agregar al carrito
    addToCart({
      category: product.defaultCategoryId,
      identifier: {
        productId: product.id,
        selectedOptions: {
          Talla: { type: "SIZE", choice: selectedSize },
        },
      },
      isPreorder: false,
      quantity,
    });

    return setIsAddedToCart(false);
  };

  if (!product) {
    return (
      <Container classNameParent="pt-16 lg:pt-28">
        <Skeletons.ProductDetails />
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.seoDescription} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.seoDescription} />
        <meta property="og:image" content={product.originalImageUrl} />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.seoDescription} />
        <meta name="twitter:image" content={product.originalImageUrl} />
      </Head>
      <Script
        src="https://s3.amazonaws.com/widgets.addi.com/bundle.min.js"
        async
        strategy="afterInteractive" // Se carga después del render
      />
      <Container classNameParent="pt-16 xs:pt-10">
        <Breadcrumbs categories={breadcrumbs} />
        <div className="pt-5 sm:pt-10 pb-28 md:grid md:grid-cols-2 lg:grid-cols-3 md:items-start md:gap-x-14 gap-y-6">
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Gallery */}
            <ImageGallery
              galleryImages={product.media.images}
              productName={product.name}
              isMobile={isMobile2}
            />
            {/* Productos relacionados */}
            {!isMobile && <RelatedProductsSection product={product} />}
          </div>
          {/* Info */}
          <div className="mt-6 md:mt-0 lg:sticky top-[200px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-500">REF {sku}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="sr-only">Product information</h2>
              <p className="text-2xl tracking-tight text-gray-900">
                {product.defaultDisplayedPriceFormatted}
              </p>
              {product.ribbon && (
                <ProductTag
                  tag={product.ribbon}
                  className={
                    "w-fit p-2 text-sm font-medium uppercase leading-5 text-white rounded-md"
                  }
                />
              )}
              {product.compareToPrice && (
                <div className="flex gap-2 text-gray-500">
                  <div className="flex gap-1">
                    <p>Antes</p>
                    <p className="line-through">
                      {product.defaultDisplayedCompareToPriceFormatted}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p>Ahorra</p>
                    <p>{product.compareToPriceDiscountPercentFormatted}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative flex gap-1">
                <p
                  className={clsx("font-medium tracking-tight text-gray-900", {
                    "text-red-500": error.type === "size",
                  })}
                >
                  Talla
                </p>
                {error.type === "size" && (
                  <span className="size-1 animate-ping rounded-full bg-red-600 opacity-75"></span>
                )}
              </div>
              <VariantOptions
                combinations={product.combinations}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                setStock={setStock}
                setSku={setSku}
              />
              {additionalFeatures?.sizeGuide && (
                <div className="mt-2">
                  <Button
                    className={"!text-base"}
                    size={"lg"}
                    onClick={() => setIsOpenModal(true)}
                  >
                    Guia de tallas
                  </Button>
                </div>
              )}
            </div>
            <div className="font-medium flex flex-col gap-2 tracking-tight text-gray-900">
              <p>
                {stock > 1
                  ? `En existencias: ${stock} disponibles`
                  : "Disponible"}
              </p>
              <div className="pb-1.5 flex gap-2 items-center">
                <p>Cantidad:</p>
                <Input
                  ref={quantityRef}
                  className={"w-16"}
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={stock}
                  onChange={(e) => {
                    if (Number(e.target.value) > stock) {
                      e.target.value = stock;
                    }
                  }}
                />
              </div>
              <Button
                className={"sm:w-2/4 !text-base bg-black"}
                size={"lg"}
                onClick={handleAddToCart}
              >
                {isAddedToCart && <Loader2 className="mr-2 animate-spin" />}
                Añadir al carrito
              </Button>
              {error.message && (
                <p className="text-red-500 text-sm font-medium">
                  {error.message}
                </p>
              )}
            </div>
            {additionalFeatures?.certification == "true" && (
              <CertificationTable />
            )}
            <div className="flex flex-col gap-2">
              {additionalFeatures?.addi && (
                <addi-widget
                  price={additionalFeatures.addi}
                  ally-slug="comercial-papelera-ecommerce"
                ></addi-widget>
              )}
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1" className={"!border-b"}>
                  <AccordionTrigger className={"!pt-0"}>
                    <p className="text-base font-medium tracking-tight text-gray-900">
                      Características del Producto
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    {additionalFeatures?.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          {/* Productos relacionados Para Mobile */}
          {isMobile && <RelatedProductsSection product={product} />}
        </div>
      </Container>
      {isOpenModal && (
        <SizeGuide
          url={additionalFeatures?.sizeGuide}
          isOpen={isOpenModal}
          onClose={setIsOpenModal}
        />
      )}
    </>
  );
};

export default Product;
