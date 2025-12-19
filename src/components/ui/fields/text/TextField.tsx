import { FieldProps } from "@/types/fields";

const TextField = (props: FieldProps) => {
  const { label, invalid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1 w-full max-w-sm min-w-[200px]">
      <label className="block text-sm text-slate-600">{label}</label>
      <input
        type="text"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        {...rest}
      />
    </div>
  );
};

export default TextField;