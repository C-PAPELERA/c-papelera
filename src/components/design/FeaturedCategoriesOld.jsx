"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Container from "./Container";

const FeaturedCategoriesOld = () => {
  return (
    <>
      <div className="py-20 grid grid-cols-1 lg:grid-cols-2">
        {/* Product 1 */}
        <div className="relative bg-gray-100 overflow-hidden pl-6 pr-6 h-[550px] xs:pr-0 xs-sm:h-[610px] sm:h-[630px] lg:pl-8 pt-20">
          <div
            aria-hidden="true"
            className="z-3 absolute inset-x-0 bottom-0 h-full sm:h-56 bg-gradient-to-t from-black opacity-90"
          />
          <div className="relative z-4 flex flex-col gap-5 md:ml-auto md:max-w-[790px]">
            <h3 className="text-4xl xs:text-5xl tracking-tight font-bold text-gray-900 leading-tight max-w-52 sm:max-w-sm">
              Product 1
            </h3>
            <p className="text-gray-900">Product 1</p>
            <Link
              className={buttonVariants({
                variant: "black",
                className: "xs:w-40",
              })}
              href={"/store/products?category=173747500&offset=0"}
            >
              <span className="text-sm font-semibold">Ver más</span>
            </Link>
          </div>
          <Image
            src="url"
            alt="Product 1"
            width={1000}
            height={1000}
            className="z-1 absolute -right-36 -bottom-12 w-full sm:right-0 xs:w-[90%] sm:w-[60%] object-cover h-full opacity-60 xs:opacity-100"
          />
        </div>
      </div>
      <Container>
        <div className="relative bg-white py-18">
          <div className="mx-auto max-w-7xl bg-white lg:bg-transparent lg:px-8">
            <div className="lg:grid lg:grid-cols-12">
              <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
                <div
                  aria-hidden="true"
                  className="absolute mt-auto inset-x-0 h-full lg:hidden w-full flex items-end"
                >
                  <div className="h-1/2 bg-gray-300 w-full" />
                </div>
                <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:p-0">
                  <Image
                    width={1000}
                    height={1000}
                    alt=""
                    src="url"
                    className="relative aspect-10/6 w-full rounded-3xl object-cover object-top shadow-2xl sm:aspect-2/1 lg:aspect-square"
                  />
                </div>
              </div>
              <div className="relative bg-gray-300 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
                >
                  <svg
                    fill="none"
                    width={404}
                    height={384}
                    viewBox="0 0 404 384"
                    aria-hidden="true"
                    className="absolute bottom-full left-full -translate-x-2/3 translate-y-1/3 transform xl:top-0 xl:bottom-auto xl:translate-y-0"
                  >
                    <defs>
                      <pattern
                        x={0}
                        y={0}
                        id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          fill="currentColor"
                          width={4}
                          height={4}
                          className="text-gray-100"
                        />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                      width={404}
                      height={384}
                    />
                  </svg>
                  <svg
                    fill="none"
                    width={404}
                    height={384}
                    viewBox="0 0 404 384"
                    aria-hidden="true"
                    className="absolute top-full -translate-x-1/3 -translate-y-1/3 transform xl:-translate-y-1/2"
                  >
                    <defs>
                      <pattern
                        x={0}
                        y={0}
                        id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          fill="currentColor"
                          width={4}
                          height={4}
                          className="text-gray-600"
                        />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                      width={404}
                      height={384}
                    />
                  </svg>
                </div>
                <div className="relative mx-auto max-w-md space-y-6 px-6 py-12 sm:max-w-3xl sm:py-16 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
                  <h3 className="text-4xl xs:text-5xl tracking-tight font-bold leading-tight max-w-52 sm:max-w-xs">
                    Category 1
                  </h3>
                  <p className="text-gray-900">
                    Category 1
                  </p>
                  <Link
                    className={buttonVariants({
                      variant: "white",
                      className: "xs:w-40",
                    })}
                    href={"/store/products?category=173747500&offset=0"}
                  >
                    <span className="text-sm font-semibold">Ver más</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FeaturedCategoriesOld;
