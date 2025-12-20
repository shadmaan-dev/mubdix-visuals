"use client";

import { Select } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { SelectFieldProps } from "@/types/fields";

const SelectField = (props: SelectFieldProps) => {
  const { label, options, invalid, className, placeholder, ...rest } = props;

  return (
    <div className={clsx("flex flex-col gap-1 w-full", className)}>
      {label && <label className="block text-sm text-slate-600 font-medium">{label}</label>}
      <div className="relative">
        <Select
          className={clsx(
            "w-full appearance-none bg-white py-2.5 pl-3 pr-10 text-sm border rounded-lg shadow-sm transition-all outline-none",
            "focus:ring-2 focus:ring-black/5 focus:border-black/20",
            invalid ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-200 hover:border-slate-300",
            "disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400 text-slate-700"
          )}
          {...rest}
        >
          {placeholder && <option value="" disabled selected>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default SelectField;
