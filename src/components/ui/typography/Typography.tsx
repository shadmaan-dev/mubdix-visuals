import React from "react";
import clsx from "clsx";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: TypographyTag;
  children: React.ReactNode;
}

const variantMapping: Record<TypographyVariant, TypographyTag> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
};

const Typography = ({
  variant = "body1",
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  const Component = as || variantMapping[variant] || "p";

  const styles = {
    h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "text-3xl font-bold tracking-tight first:mt-0",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
    h5: "text-lg font-semibold tracking-tight",
    h6: "text-base font-semibold tracking-tight",
    subtitle1: "text-lg font-medium leading-none",
    subtitle2: "text-sm font-medium leading-none",
    body1: "text-base leading-7",
    body2: "text-sm leading-6",
    caption: "text-xs text-muted-foreground",
    overline: "text-[10px] uppercase font-bold tracking-widest text-muted-foreground",
  };

  return (
    <Component className={clsx(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;