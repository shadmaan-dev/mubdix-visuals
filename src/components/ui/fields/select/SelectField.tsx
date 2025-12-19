import { SelectFieldProps } from "@/types/fields";


const SelectField = (props: SelectFieldProps) => {
  const { label, options, invalid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm text-slate-600">{label}</label>
      <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
