import React from "react";

import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import { cn } from "../../lib/utils";

interface InputFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  placeholder: string;
  disabled?: boolean;
  inputClassNames?: string;
  label?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const InputField = <T extends FieldValues>({
  id,
  type,
  placeholder,
  disabled,
  inputClassNames,
  label,
  register,
  errors,
}: InputFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);
  return (
    <fieldset className="my-1">
      {label && <legend className="fieldset-legend">{label}</legend>}
      <input
        id={id}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        {...register(id as Path<T>)}
        className={cn(
          "input w-full focus:outline-none",
          errors[id] && "input-error",
          inputClassNames,
        )}
      />
      <p className="fieldset-label text-rose-500">{message}</p>
    </fieldset>
  );
};

export default InputField;
