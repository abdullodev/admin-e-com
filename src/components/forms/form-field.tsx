import {
  useFormContext,
  Controller,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export type FormFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  render: (field: any) => React.ReactElement; // Render Shadcn component
};

export function FormField<T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  render,
}: FormFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => render({ ...field, placeholder, id: name })}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
