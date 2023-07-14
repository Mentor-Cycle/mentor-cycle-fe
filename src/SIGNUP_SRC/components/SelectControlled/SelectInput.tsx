import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ISelectInput extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectInput = React.forwardRef<HTMLDivElement, ISelectInput>(
  function SelecInputComponent({ children, className, ...rest }, ref) {
    return (
      <div
        {...rest}
        className={twMerge(
          "flex flex-wrap gap-2 pr-16 items-center cursor-pointer w-full rounded-lg",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
