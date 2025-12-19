import { SelectFieldProps } from "@/types/fields";


const SelectField = (props: SelectFieldProps) => {
  const { label, options, invalid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <select className="text-sm border border-default rounded-md py-1.5 px-2" {...rest}>
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
