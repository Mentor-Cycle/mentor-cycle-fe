import React, { InputHTMLAttributes, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  InputErrorMessage,
  InputWrapper,
  InputLabel,
} from "SIGNUP_SRC/components/Input";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string | undefined;
  asChild?: boolean;
  grow?: number;
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(
  function InputComponent(
    {
      asChild,
      grow = 1,
      type = "text",
      errorMessage,
      label,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const inputId = useId();
    const _cn = className ? ` ${className}` : "";
    const Component = asChild ? Slot : "input";

    return (
      <InputWrapper grow={grow}>
        <InputLabel label={label} />
        <Component
          id={inputId}
          type={type}
          tabIndex={20}
          className={"input-sign" + _cn}
          ref={asChild ? null : ref}
          {...rest}
        >
          {children}
        </Component>
        <InputErrorMessage errorMessage={errorMessage} />
      </InputWrapper>
    );
  }
);
