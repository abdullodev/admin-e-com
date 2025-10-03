import {
  useFormContext,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input"; // Shadcn/UI Input
import { Label } from "@/components/ui/label"; // Shadcn/UI Label
import { cn } from "@/lib/utils";

type InputFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | string; // Common HTML input types
  className?: string;
  disabled?: boolean;
  autoComplete?: string; // For accessibility and form autofill
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  disabled = false,
  autoComplete,
}: InputFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name} className={error ? "text-destructive" : ""}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={cn(error && "border-destructive focus:ring-destructive")}
            value={field.value ?? ""} // Handle undefined/null values
            onChange={(e) => field.onChange(e.target.value)} // Ensure proper value updates
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
