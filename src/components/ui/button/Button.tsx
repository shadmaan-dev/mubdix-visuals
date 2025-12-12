import React from "react";
import clsx from "clsx";

export type ButtonVariant = "solid" | "outlined" | "ghost";
export type ButtonSeverity = "primary" | "secondary" | "success" | "danger" | "warning" | "info";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  severity?: ButtonSeverity;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  label,
  variant = "solid",
  severity = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    solid: "",
    outlined: "border border-current bg-transparent",
    ghost: "bg-transparent hover:bg-opacity-10",
  };

  const severities = {
    primary: {
      solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      outlined: "text-blue-600 border-blue-600 hover:bg-blue-50",
      ghost: "text-blue-600 hover:bg-blue-50",
    },
    secondary: {
      solid: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      outlined: "text-gray-600 border-gray-600 hover:bg-gray-50",
      ghost: "text-gray-600 hover:bg-gray-50",
    },
    success: {
      solid: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      outlined: "text-green-600 border-green-600 hover:bg-green-50",
      ghost: "text-green-600 hover:bg-green-50",
    },
    danger: {
      solid: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outlined: "text-red-600 border-red-600 hover:bg-red-50",
      ghost: "text-red-600 hover:bg-red-50",
    },
    warning: {
      solid: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
      outlined: "text-yellow-600 border-yellow-500 hover:bg-yellow-50",
      ghost: "text-yellow-600 hover:bg-yellow-50",
    },
    info: {
      solid: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
      outlined: "text-cyan-600 border-cyan-600 hover:bg-cyan-50",
      ghost: "text-cyan-600 hover:bg-cyan-50",
    },
  };

  const sizes = {
    xs: "h-6 px-2 text-xs gap-1",
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 py-2 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
  };

  const severityStyles = severities[severity][variant];

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        severityStyles,
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {label || children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;  