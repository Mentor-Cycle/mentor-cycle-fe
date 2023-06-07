import React, { useState, ChangeEvent } from "react";
import clsx from "clsx";
import { ITextarea } from "./Textarea.types";
import * as Label from "@radix-ui/react-label";

export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(
  function TextareaComponent(
    { label, name, disabled, className, required, ...rest },
    ref
  ) {
    const [invalid, setInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInvalid(!event.target.checkValidity() || !event.target.value);
      setErrorMessage(event.target.validationMessage || "");
    };

    return (
      <Label.Root
        className={clsx(disabled && "input-label-disabled", "input-label")}
        htmlFor={name}
      >
        {label}
        {required && (
          <span title="Obrigatório" className="text-danger-01 mx-1">
            *
          </span>
        )}
        <textarea
          ref={ref}
          name={name}
          disabled={disabled}
          className={clsx(
            "w-full h-48 resize-none text-secondary-05",
            invalid && "input-invalid",
            "input-default",
            className
          )}
          onBlur={handleBlur}
          {...rest}
        />
        {errorMessage && !disabled && (
          <div className="input-error">{errorMessage}</div>
        )}
      </Label.Root>
    );
  }
);

export default Textarea;
