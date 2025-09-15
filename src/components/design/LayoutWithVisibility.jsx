"use client";

import useLayoutVisibility from "@/hooks/useLayoutVisibility";
import Header from "./Header";
import Footer from "./Footer";

const LayoutWithVisibility = ({ children }) => {
  const { hideLayout } = useLayoutVisibility();

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <div className="pt-42 sm:pt-44 lg:pt-60 xl:pt-64 max-[390px]:pt-40" />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default LayoutWithVisibility;
