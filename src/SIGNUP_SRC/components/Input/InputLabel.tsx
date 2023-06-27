import React, { LabelHTMLAttributes } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  disabled?: boolean;
}

export function InputLabel({ disabled, label, className, ...rest }: InputLabelProps) {
  const _cn = className ? ` ${className}` : "";

  return (
    <label
      data-disabled={disabled}
      className={
        `mb-1 text-sm text-gray-03 data-[disabled=true]:text-gray-02 data-[disabled=true]:cursor-not-allowed` +
        _cn
      }
      {...rest}
    >
      {label}
    </label>
  );
}
