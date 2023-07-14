import { useTheme } from "next-themes";
import React, { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  disabled?: boolean;
  required?: boolean;
}

export function InputLabel({ required, disabled, label, ...rest }: InputLabelProps) {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  return (
    <label
      {...rest}
      data-disabled={disabled}
      data-required={required}
      className={twMerge(
        "relative mb-1 text-sm text-gray-03 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 w-fit",
        "data-[required=true]:after:text-primary-03 data-[required=true]:after:content-['*'] data-[required=true]:after:font-bold data-[required=true]:after:absolute data-[required=true]:after:-right-2.5",
        rest.className
      )}
      style={{
        color: isLightMode ? "var(--secondary-03)" : "var(--neutral-01)",
      }}
    >
      {label}
    </label>
  );
}
