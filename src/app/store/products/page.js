import Container from "@/components/design/Container";
import { redirect, notFound } from "next/navigation";
import Products from "./Products";
import { ecwidFetch, getBreadcrumbs, getProducts } from "@/lib/ecwid";

export async function generateMetadata({ searchParams }) {
  const categoryId = (await searchParams)?.category;

  const res = await ecwidFetch({
    method: "GET",
    path: `/categories/${categoryId}`,
    //tags: [TAGS.products]
  });

  const category = res.body;

  if (!category || category.errorMessage) {
    return notFound();
  }

  const logo =
    "/assets/img/logo-icon.png";
  const description =
    "Comercial Papelera";

  return {
    title: category.name,
    description: description,
    openGraph: {
      title: category.name,
      description: description,
      images: [
        {
          url: logo,
          width: 800,
          height: 600,
          alt: category.name,
        },
      ],
    },
    twitter: {
      title: category.name,
      description: description,
      images: [
        {
          url: logo,
          width: 800,
          height: 600,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function ProductsPage({ searchParams }) {
  const hasParams =
    (await searchParams)?.category && (await searchParams)?.offset;

  if (!hasParams) {
    redirect("/store/products?category=187028062&offset=0");
  }

  const res = await getProducts({
    query: await searchParams,
  });

  // Breadcrumbs
  const breadcrumbs = await getBreadcrumbs((await searchParams)?.category);

  // Categories
  const categories = await ecwidFetch({
    method: "GET",
    path: `/categories`,
    query: {
      parent: (await searchParams)?.category,
    },
    //tags: [TAGS.products]
  });

  // Sizes
  const sizesRes = await ecwidFetch({
    method: "POST",
    useStorefrontAPI: true,
    path: `/catalog/filters`,
    payload: {
      parentCategoryId: (await searchParams)?.category,
    },
    //tags: [TAGS.products]
  });

  const sizes = sizesRes.body.filters.find(
    (f) => f.optionId === "Talla"
  )?.values;

  return (
    <Container className={"py-10"}>
      <Products
        searchParams={await searchParams}
        productsRes={res}
        breadcrumbs={breadcrumbs}
        categories={categories.body.items}
        sizes={sizes}
      />
    </Container>
  );
}
