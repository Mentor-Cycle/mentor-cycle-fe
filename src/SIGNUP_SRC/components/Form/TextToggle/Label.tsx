import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

export function Label({ text, ...props }: LabelProps) {
  return (
    <p
      {...props}
      className={twMerge(
        "pl-2 py-1.5 pr-6 text-xs leading-none rounded-l-full translate-x-4",
        props.className
      )}
      style={{
        color: "#CECECE", // gray-01
      }}
    >
      {text}
    </p>
  );
}
