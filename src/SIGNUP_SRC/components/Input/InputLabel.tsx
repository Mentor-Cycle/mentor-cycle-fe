import React, { LabelHTMLAttributes } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export function InputLabel({ label, className, ...rest }: InputLabelProps) {
  const _cn = className ? ` ${className}` : "";

  return (
    <label className={"mb-1 text-sm text-gray-03" + _cn} {...rest}>
      {label}
    </label>
  );
}
