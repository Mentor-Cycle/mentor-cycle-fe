import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

interface InputContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function InputContainer({ asChild, children, ...rest }: InputContainerProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component {...rest} className={twMerge("input-sign", rest.className)}>
      {children}
    </Component>
  );
}
