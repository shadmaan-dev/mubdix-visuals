import React from "react";
import clsx from "clsx";

export type MenuSize = "xs" | "sm" | "md" | "lg";

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: MenuSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

const MenuItem = ({
  label,
  size = "md",
  leftIcon,
  rightIcon,
  active = false,
  disabled = false,
  className,
  onClick,
  ...props
}: MenuItemProps) => {
  const baseStyles = "flex items-center w-full cursor-pointer transition-colors duration-150 ease-in-out select-none";
  const activeStyles = active ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900";
  const disabledStyles = disabled ? "opacity-50 pointer-events-none" : "";

  const sizes = {
    xs: "h-6 px-2 text-xs gap-2",
    sm: "h-8 px-3 text-sm gap-3",
    md: "h-10 px-4 text-sm gap-3",
    lg: "h-12 px-5 text-base gap-4",
  };

  const iconSizes = {
    xs: "h-3.5 w-3.5",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={clsx(baseStyles, sizes[size], activeStyles, disabledStyles, className)}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {leftIcon && (
        <span className={clsx("flex-shrink-0 text-gray-400 group-hover:text-gray-500", active && "text-gray-500")}>
          {leftIcon}
        </span>
      )}
      <span className="flex-1 truncate">{label}</span>
      {rightIcon && (
        <span className={clsx("flex-shrink-0 text-gray-400 group-hover:text-gray-500", active && "text-gray-500")}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default MenuItem;