import Container from "./Container";

const Products = ({ items }) => {
  return Array.from({ length: items }).map((_, index) => (
    <div key={index} className="space-y-3">
      <div className="h-48 w-full rounded-xl bg-gray-200 animate-pulse" />
      <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
    </div>
  ));
};

const ProductDetails = () => {
  return (
    <div className="pt-6 pb-28 lg:pt-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <div className="w-full flex flex-col items-center lg:items-start lg:flex-row-reverse gap-6 ">
        <div className="h-[475px] w-full bg-gray-200 animate-pulse rounded-md" />
        <div className="flex lg:flex-col gap-2">
          <div className="size-28 bg-gray-200 animate-pulse rounded-md" />
          <div className="size-28 bg-gray-200 animate-pulse rounded-md" />
          <div className="size-28 bg-gray-200 animate-pulse rounded-md" />
          <div className="size-28 bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
      <div className="mt-6 lg:mt-0 space-y-3">
        <div className="h-48 w-full rounded-md bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/4 rounded-sm bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/4 rounded-sm bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

const Cart = () => {
  return (
    <Container className="pt-20">
      <div className="pt-6 pb-28 lg:pt-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <div className="h-[475px] w-full bg-gray-200 animate-pulse rounded-md" />
        <div className="mt-6 lg:mt-0 space-y-3">
          <div className="h-48 w-full rounded-md bg-gray-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 w-1/2 rounded-sm bg-gray-200 animate-pulse" />
        </div>
      </div>
    </Container>
  );
};

const Skeletons = {
  Products,
  ProductDetails,
  Cart,
};

export default Skeletons;
