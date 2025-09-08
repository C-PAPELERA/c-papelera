import { notFound } from "next/navigation";
import Product from "./Product";
import { ecwidFetch, getBreadcrumbs } from "@/lib/ecwid";
import { getCategories } from "@/lib/ecwid-functions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const productId = (await params)?.id;

  if (!productId) return notFound();

  const res = await ecwidFetch({
    method: "GET",
    path: `/products/${productId}`,
    //tags: [TAGS.products]
  });

  const product = res.body;

  if (product.errorCode || product.error) return notFound();

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: product.name,
    description: product.seoDescription,
    openGraph: {
      title: product.name,
      description: product.seoDescription,
      images: [
        {
          url: product.originalImageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      title: product.name,
      description: product.seoDescription,
      images: [
        {
          url: product.originalImageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }) {
  const productId = (await params)?.id;

  if (!productId) return notFound();

  const res = await ecwidFetch({
    method: "GET",
    path: `/products/${productId}`,
    //tags: [TAGS.products]
  });

  const product = res.body;

  if (product.errorCode || product.error || !product.enabled) return notFound();

  // Breadcrumbs
  const breadcrumbs = await getBreadcrumbs(product.defaultCategoryId);

  // Brand
  let brand = null
  const marcas = await getCategories({ query: { parent: 187874254 } })
  if (marcas) {
    brand = marcas.find((item) => product.categories.some((category) => category.name === item.name))
  }

  // Product related
  const relatedProducts = await ecwidFetch({
    method: "POST",
    useStorefrontAPI: true,
    path: '/catalog/related-products',
    payload: {
      productIdentifier: {
        type: "PUBLISHED",
        productId,
      },
      urlParams: {
        baseUrl:
          process.env.NODE_ENV === "production"
            ? "https://c-papelera.vercel.app/store/products"
            : "http://localhost:3000/store/products",
        canonicalBaseUrl: "",
        isCleanUrls: true,
        isCanonicalUrlsEnabled: false,
        isSlugsWithoutIds: false,
      },
    },
    //tags: [TAGS.products]
  });

  return (
    <Product
      productId={productId}
      params={params}
      productRes={product}
      breadcrumbs={breadcrumbs}
      brand={brand}
      relatedProducts={relatedProducts.body?.items || []}
    />
  );
}
