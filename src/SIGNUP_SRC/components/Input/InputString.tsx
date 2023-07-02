import React, { InputHTMLAttributes, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Input } from "SIGNUP_SRC/components/Input";
import { twMerge } from "tailwind-merge";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string | undefined;
  asChild?: boolean;
  grow?: number;
  required?: boolean;
  rootClasses?: string;
}

export const InputString = React.forwardRef<HTMLInputElement, IInput>(
  function InputStringComponent(
    {
      asChild,
      grow = 1,
      type = "text",
      required,
      errorMessage,
      label,
      children,
      tabIndex = 20,
      rootClasses,
      ...rest
    },
    ref
  ) {
    const inputId = useId();
    const Component = asChild ? Slot : "input";

    return (
      <Input.Root grow={grow} className={rootClasses}>
        <Input.Label label={label} htmlFor={inputId} required={required} />
        <Component
          {...rest}
          tabIndex={tabIndex}
          type={type}
          id={inputId}
          className={twMerge("input-sign", rest.className)}
          ref={asChild ? null : ref}
        >
          {children}
        </Component>
        <Input.Error errorMessage={errorMessage} />
      </Input.Root>
    );
  }
);
