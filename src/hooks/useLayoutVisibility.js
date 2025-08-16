"use client";

import { useContext } from "react";
import { LayoutVisibilityContext } from "../context/LayoutVisibilityContext";

export const useLayoutVisibility = () => {
  const context = useContext(LayoutVisibilityContext);
  if (!context) {
    throw new Error(
      "useLayoutVisibility must be used within a LayoutVisibilityProvider"
    );
  }
  return context;
};

export default useLayoutVisibility;
