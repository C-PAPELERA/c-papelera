"use client";

import { createContext, useState } from "react";

const LayoutVisibilityContext = createContext({
  hideLayout: false,
  setHideLayout: () => {},
});

const LayoutVisibilityProvider = ({ children }) => {
  const [hideLayout, setHideLayout] = useState(false);

  return (
    <LayoutVisibilityContext.Provider value={{ hideLayout, setHideLayout }}>
      {children}
    </LayoutVisibilityContext.Provider>
  );
};

export { LayoutVisibilityProvider, LayoutVisibilityContext };
