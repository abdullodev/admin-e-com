import type { FieldValues } from "react-hook-form";
import { FormField, type FormFieldProps } from "./form-field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type FormRadioGroupProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "render"
> & {
  options: { value: string; label: string }[];
};

export function FormRadio<T extends FieldValues>({
  options,
  ...props
}: FormRadioGroupProps<T>) {
  return (
    <FormField<T>
      {...props}
      render={({ value, onChange }) => (
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-col space-y-1"
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
