import { FieldProps } from "@/types/fields";

interface SliderFieldProps extends FieldProps {
  min?: number;
  max?: number;
}

const SliderField = (props: SliderFieldProps) => {
  const { label, invalid, min = 10, max = 1000, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm text-slate-600">{label}</label>
      <input
        type="range"
        className="w-full bg-transparent border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow h-9 appearance-none cursor-pointer"
        min={min}
        max={max}
        {...rest}
      />
    </div>
  );
};

export default SliderField;