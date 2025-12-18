import { FieldProps } from "@/types/fields";

interface SliderFieldProps extends FieldProps {
  min?: number;
  max?: number;
}

const SliderField = (props: SliderFieldProps) => {
  const { label, invalid, min = 10, max = 1000, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input type="range" className="w-full" min={min} max={max} {...rest} />
    </div>
  );
};

export default SliderField;