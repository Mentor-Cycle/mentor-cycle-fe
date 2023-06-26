import React, { LabelHTMLAttributes, useId } from "react";

interface InputLabelProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> {
  label: string;
}

export function InputLabel({ label, className, ...rest }: InputLabelProps) {
  const _cn = className ? ` ${className}` : "";
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={"mb-1 text-sm text-gray-03" + _cn}
      {...rest}
    >
      {label}
    </label>
  );
}
