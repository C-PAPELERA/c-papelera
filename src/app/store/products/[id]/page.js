import { notFound } from "next/navigation";
import Product from "./Product";
import { ecwidFetch, getBreadcrumbs } from "@/lib/ecwid";

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

  return (
    <Product
      productId={productId}
      params={params}
      productRes={product}
      breadcrumbs={breadcrumbs}
    />
  );
}
