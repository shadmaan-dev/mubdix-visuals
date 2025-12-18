import { SelectFieldProps } from "@/types/fields";


const SelectField = (props: SelectFieldProps) => {
  const { label, options, invalid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <select className="border border-default rounded-md p-2" {...rest}>
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
