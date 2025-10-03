import type { FieldValues } from "react-hook-form";
import { FormField, type FormFieldProps } from "./form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectFieldProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "render"
> & {
  options: { value: string; label: string }[];
};

export function FormSelect<T extends FieldValues>({
  options,
  placeholder,
  ...props
}: SelectFieldProps<T>) {
  return (
    <FormField<T>
      {...props}
      render={({ value, onChange }) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
