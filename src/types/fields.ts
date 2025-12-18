
export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  label?: string;
  invalid?: boolean;
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  invalid?: boolean;
  options: { label: string; value: string }[];
}