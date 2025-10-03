import type { FieldValues } from "react-hook-form";
import { FormField, type FormFieldProps } from "./form-field";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type FormCheckboxProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "render"
> & {
  description?: string;
};

export function FormCheckbox<T extends FieldValues>(
  props: FormCheckboxProps<T>
) {
  return (
    <FormField<T>
      {...props}
      render={({ value, onChange }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={value}
            onCheckedChange={onChange}
            id={props.name}
          />
          {props.description && (
            <Label htmlFor={props.name}>{props.description}</Label>
          )}
        </div>
      )}
    />
  );
}
