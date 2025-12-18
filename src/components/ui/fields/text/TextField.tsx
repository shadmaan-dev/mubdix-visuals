import { FieldProps } from "@/types/fields";

const TextField = (props: FieldProps) => {
  const { label, invalid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input type="text" className="border border-default rounded-md p-2" {...rest} />
    </div>
  );
};

export default TextField;