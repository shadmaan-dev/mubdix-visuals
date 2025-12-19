import { FieldProps } from "@/types/fields";

const TextField = (props: FieldProps) => {
  const { label, invalid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input type="text" className="text-sm border rounded-md py-1.5 px-2" {...rest} />
    </div>
  );
};

export default TextField;