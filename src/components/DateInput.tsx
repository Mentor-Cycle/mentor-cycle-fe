import React from "react";
import { InputAttributes, PatternFormat, PatternFormatProps } from "react-number-format";

export interface IDateInput extends PatternFormatProps<InputAttributes> {}

export const DateInput = React.forwardRef<HTMLInputElement, IDateInput>(
  function DateInputComponent({ className, format, ...rest }, ref) {
    const _cn = className ? ` ${className}` : "";

    return (
      <>
        <input type="hidden" ref={ref} />
        <PatternFormat
          valueIsNumericString
          format="##/##/####"
          mask="_"
          className={"" + _cn}
          {...rest}
        />
      </>
    );
  }
);
