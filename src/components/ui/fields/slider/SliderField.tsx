import { FieldProps } from "@/types/fields";

interface SliderFieldProps extends FieldProps {
  min?: number;
  max?: number;
}

const SliderField = (props: SliderFieldProps) => {
  const { label, invalid, min = 10, max = 1000, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="range"
        className="w-full h-8 border border-gray-600  rounded-md appearance-none cursor-pointer"
        min={min}
        max={max}
        {...rest}
      />
    </div>
  );
};

export default SliderField;