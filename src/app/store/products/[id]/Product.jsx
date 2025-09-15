"use client";

import { Loader2, Check, ChevronUp, ChevronDown } from "lucide-react";

// Hooks
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";

// Components
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Container from "@/components/design/Container";
import Skeletons from "@/components/design/Skeletons";
import Breadcrumbs from "../../components/Breadcrumbs";
import ImageGallery from "../../components/ImageGallery";
import RelatedProducts from "../../components/RelatedProducts";
import ProductTag from "../../components/ProductTag";
import DiscountTag from "../../components/DiscountTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VariantOptions from "@/app/store/components/VariantOptions";
import CertificationTable from "../../components/CertificationTable";
import SizeGuide from "../../components/SizeGuide";
//import { addToCartAction } from "@/app/actions/store";
import useStore from "@/hooks/useStore";
import Link from "next/link";
import StoreFeatures from "@/components/design/StoreFeatures";
import SameCategoryProducts from "../../components/SameCategoryProducts";

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

const RelatedProductsSection = ({ products }) => {
  const productIds = products.map((item) => item.identifier.productId);
  return (
    <div className="py-10 flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-papelera mb-2">
        Productos relacionados
      </h2>
      <RelatedProducts productIds={productIds} />
    </div>
  );
};

const InTheSameCategorySection = ({ categoryId }) => {
  return (
    <div className="py-10 flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-papelera mb-2">
        En la misma categoría
      </h2>
      <SameCategoryProducts categoryId={categoryId} />
    </div>
  );
};

const Product = ({ productRes, breadcrumbs, params, brand, relatedProducts }) => {
  // Hooks general
  const quantityRef = useRef();
  const isMobile = useIsMobile(1024);
  const isMobile2 = useIsMobile(768);
  const [error, setError] = useState({});
  const [stock, setStock] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showGoToCart, setShowGoToCart] = useState(false);

  // Hooks products
  const [sku, setSku] = useState(null);
  const [product, setProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [additionalFeatures, setAdditionalFeatures] = useState(null);
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };
  const decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleProduct = () => {
    setProduct(productRes);
    setAdditionalFeatures(parseHtmlListToObject(productRes.description));
    setSku(productRes.sku);
    setStock(productRes.quantity);
  };

  useEffect(() => {
    handleProduct();
  }, [params]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setShowGoToCart(true);
    setError({});

    // if (!selectedSize) {
    //   setError({
    //     type: "size",
    //     message: "Por favor especifique sus opciones",
    //   });

    //   setIsAddedToCart(false);
    //   return;
    // }

    const quantityCart = Number(quantity) || 1;

    // Agregar al carrito
    addToCart({
      category: product.defaultCategoryId,
      identifier: {
        productId: product.id,
        // selectedOptions: {
        //   Talla: { type: "SIZE", choice: selectedSize },
        // },
      },
      isPreorder: false,
      quantity: quantityCart,
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
      <Container classNameParent="pt-16 xs:pt-10 pb-26">
        <Breadcrumbs categories={breadcrumbs} />
        <div className="pt-5 sm:pt-2 pb-28 md:grid md:grid-cols-2 lg:grid-cols-3 md:items-start md:gap-x-14 gap-y-6">
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Gallery */}
            <ImageGallery
              galleryImages={product.media.images}
              productName={product.name}
              isMobile={isMobile2}
            />
          </div>
          {/* Info */}
          <div className="mt-6 md:mt-0 lg:sticky top-[200px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-papelera">
                {product.name}
              </h1>
              <p className="text-gray-500">REF {sku}</p>
            </div>
            <div className="flex gap-2">
              {/* Descuento */}
              {product.compareToPriceDiscount && (
                <DiscountTag
                  tag={product.compareToPriceDiscountPercentFormatted}
                  className={
                    "w-fit py-1 px-3 text-sm font-medium uppercase leading-5 text-white rounded-md"
                  }
                />
              )}
              {/* Etiqueta */}
              {product.ribbon && (
                <ProductTag
                  tag={product.ribbon}
                  className={
                    "w-fit py-1 px-3 text-sm font-medium uppercase leading-5 text-white rounded-md"
                  }
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="sr-only">Product information</h2>
              <p className="text-2xl tracking-tight font-medium text-papelera">
                {product.defaultDisplayedPriceFormatted}
              </p>

              {product.compareToPriceDiscount && (
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

            {/* <div className="flex flex-col gap-2"> */}
            {/* <div className="relative flex gap-1">
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
              </div> */}
            {/* <VariantOptions
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
              )} */}
            {/* </div> */}
            <div className="font-medium text-lg flex flex-col gap-1 tracking-tight text-gray-900">
              {stock > 1 && (
                <div className="flex gap-1 items-center">
                  <Check className="text-green-500" />
                  <p>Producto en stock</p>
                </div>
              )}
              <p className="font-normal pb-5">
                {stock > 1
                  ? `Cantidad disponible: ${stock} artículos`
                  : `Disponible`}
              </p>
              <div className="pb-4 flex gap-2 items-center">
                <p>Cantidad:</p>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val > stock) val = stock;
                    if (val < 1) val = 1;
                    setQuantity(val);
                  }}
                  min={1}
                  max={stock}
                  className="w-13 h-11 border border-papelera/80 rounded-md text-center text-[15px]"
                />
                {/* Subir y bajar cantidad */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={increase}
                    className="w-6 h-5 flex items-center justify-center border border-papelera/80 rounded-t hover:bg-gray-100"
                  >
                    <ChevronUp className="w-4 h-4 text-papelera" />
                  </button>
                  <button
                    type="button"
                    onClick={decrease}
                    className="w-6 h-5 flex items-center justify-center border border-papelera/80 rounded-b hover:bg-gray-100"
                  >
                    <ChevronDown className="w-4 h-4 text-papelera" />
                  </button>
                </div>
              </div>
              <Button
                className={`sm:w-2/4 mb-0.5 !text-base rounded-md ${showGoToCart ? "bg-white text-papelera border border-papelera hover:bg-gray-100" : "bg-papelera hover:bg-papelera/95"}`}
                size={"lg"}
                onClick={handleAddToCart}
              >
                {isAddedToCart && <Loader2 className="mr-2 animate-spin" />}
                Agregar al carrito
              </Button>
              {showGoToCart && (
                <a href="/store/cart?store-page=cart">
                  <Button className={"w-full sm:w-2/4 !text-base rounded-md bg-papelera hover:bg-papelera/95"} size={"lg"}>
                    Ir al Pago
                  </Button>
                </a>
              )}
              {/* Condiciones de envio */}
              {product.attributes.find((attr) => attr.name === "Envío") && (
                <p className="font-normal text-[15px] text-gray-500 mt-2">{product.attributes.find((attr) => attr.name === "Envío").value}</p>
              )}

              {error.message && (
                <p className="text-red-500 text-sm font-medium">
                  {error.message}
                </p>
              )}

              {/* Metodos de pago */}
              <div className="flex gap-2 items-center mt-6">
                <Image width={50} height={50} src="/assets/svg/ssl.svg" alt="Metodos de pago payu" className="w-10" />
                <p className="text-[15px] text-gray-800">Pago 100% seguro con SSL</p>
              </div>
              <Image width={50} height={50} src="/assets/img/payu.png" alt="Metodos de pago payu" className="w-sm mt-2" />

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
            </div>
          </div>
          {/* Descripcion y marca */}
          <Tabs defaultValue="description" className="w-full h-[300px] mt-10 sm:mt-0 pr-5 lg:col-span-2">
            <TabsList className={"flex gap-4 pb-2"}>
              <TabsTrigger value="description" className="text-lg md:text-xl text-papelera pb-4">Descripción</TabsTrigger>
              <TabsTrigger value="details" className="text-lg md:text-xl text-papelera pb-4">Detalles del producto</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="md:text-lg mt-2">{product.description.replace(/<[^>]+>/g, "")}</TabsContent>
            <TabsContent value="details" className="mt-2">
              {/* Marca */}
              {brand && (
                <div key={brand.name} className="group relative">
                  <div className="w-[100%] lg:w-[50%] xl:w-[25%] rounded-lg overflow-hidden aspect-4/3 ring-1 ring-papelera/10 p-10">
                    <Image
                      width={500}
                      height={500}
                      alt={brand.name}
                      src={brand.imageUrl}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 text-sm text-gray-500">
                    <p className="text-md lg:text-lg font-semibold text-papelera mb-1">{brand.name}</p>
                    <a href={`/store/products?category=${brand.id}&offset=0`}>
                      <span className="absolute inset-0" />
                      {brand.productCount} productos
                    </a>
                  </h3>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <RelatedProductsSection products={relatedProducts} />
        )}

        {/* En la misma categoría */}
        <InTheSameCategorySection categoryId={product.defaultCategoryId} />
      </Container>

      {/* Características de la tienda */}
      <StoreFeatures />

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
