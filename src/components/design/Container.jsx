"use-client";

import clsx from "clsx";

const Container = ({ classNameParent, className, children }) => {
  return (
    <div className={clsx(classNameParent, "px-6 lg:px-8")}>
      <div className={clsx(className, "mx-auto max-w-2xl md:max-w-[1580px]")}>
        {children}
      </div>
    </div>
  );
};

export default Container;
