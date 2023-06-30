import React, { LabelHTMLAttributes } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  disabled?: boolean;
  required?: boolean;
}

export function InputLabel({
  required,
  disabled,
  label,
  className,
  ...rest
}: InputLabelProps) {
  const _cn = className ? ` ${className}` : "";

  return (
    <label
      data-disabled={disabled}
      data-required={required}
      className={
        `relative mb-1 text-sm text-gray-03 data-[disabled=true]:text-gray-02 data-[disabled=true]:cursor-not-allowed w-fit data-[required=true]:after:text-primary-03 data-[required=true]:after:content-['*'] data-[required=true]:after:font-bold data-[required=true]:after:absolute data-[required=true]:after:-right-2.5
        ` + _cn
      }
      {...rest}
    >
      {label}
    </label>
  );
}
