"use client";

import useLayoutVisibility from "@/hooks/useLayoutVisibility";
import Header from "./Header";

const LayoutWithVisibility = ({ children }) => {
  const { hideLayout } = useLayoutVisibility();

  return (
    <>
      {!hideLayout && <Header />}
      {children}
    </>
  );
};

export default LayoutWithVisibility;
