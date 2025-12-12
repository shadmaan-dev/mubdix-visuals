import { Search } from "lucide-react";
import clsx from "clsx";

export type SearchFieldSize = "xs" | "sm" | "md" | "lg";
export type SearchFieldSeverity = "primary" | "secondary";

interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: SearchFieldSize;
  severity?: SearchFieldSeverity;
}

const SearchField = ({ size = "sm", severity = "primary", className, ...props }: SearchFieldProps) => {

  const inputSizes = {
    xs: "h-6 pl-8 pr-2 text-xs",
    sm: "h-8 pl-9 pr-3 text-sm",
    md: "h-10 pl-10 pr-3 text-sm",
    lg: "h-12 pl-11 pr-4 text-base",
  };

  const iconWrapperPosition = {
    xs: "pl-2",
    sm: "pl-2.5",
    md: "pl-3",
    lg: "pl-3",
  };

  const iconSizes = {
    xs: "h-3.5 w-3.5",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const severities = {
    primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
    secondary: "border-gray-200 focus:ring-gray-400 focus:border-gray-400",
  };

  return (
    <div className="relative w-full">
      <div className={clsx("absolute inset-y-0 left-0 flex items-center pointer-events-none", iconWrapperPosition[size])}>
        <Search className={clsx("text-gray-400", iconSizes[size])} />
      </div>
      <input
        type="search"
        className={clsx(
          "block w-full border rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 transition duration-150 ease-in-out",
          inputSizes[size],
          severities[severity],
          className
        )}
        placeholder="Search"
        {...props}
      />
    </div>
  );
};

export default SearchField;