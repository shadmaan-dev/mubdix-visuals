import React from "react";
import clsx from "clsx";

type ViewProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  ref?: any;
} & React.ComponentPropsWithoutRef<T>;

export const View = <T extends React.ElementType = "div">({
  as,
  className,
  children,
  ref,
  ...rest
}: ViewProps<T>) => {
  const Component = as || "div";
  return (
    <Component className={clsx(className)} ref={ref} {...rest}>
      {children}
    </Component>
  );
};