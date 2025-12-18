
export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  label?: string;
  invalid?: boolean;
}