import React, { HTMLAttributes } from "react";

interface ISelectInput extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectInput = React.forwardRef<HTMLDivElement, ISelectInput>(
  function SelecInputComponent({ children, className, ...rest }, ref) {
    const _cn = ` ${className ?? ""}`;

    return (
      <div
        className={
          "flex flex-wrap gap-2 pr-16 items-center cursor-pointer w-full rounded-lg shadow-md" +
          _cn
        }
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
