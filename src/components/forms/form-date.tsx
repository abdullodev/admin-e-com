import type { FieldValues } from "react-hook-form";
import { FormField, type FormFieldProps } from "./form-field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

type DatePickerFieldProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "render"
>;

export function FormDate<T extends FieldValues>(
  props: DatePickerFieldProps<T>
) {
  return (
    <FormField<T>
      {...props}
      render={({ value, onChange }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={value} onSelect={onChange} />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
