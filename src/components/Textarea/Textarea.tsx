import React, { useState, ChangeEvent, useId } from "react";
import clsx from "clsx";
import { ITextarea } from "./Textarea.types";
import * as Label from "@radix-ui/react-label";

export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(
  function TextareaComponent(
    { label, name, disabled, className, required, ...rest },
    ref
  ) {
    const textareaId = useId();
    const [invalid, setInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInvalid(!event.target.checkValidity() || !event.target.value);
      setErrorMessage(event.target.validationMessage || "");
    };

    return (
      <div className={clsx(disabled && "input-label-disabled", "input-label")}>
        <Label.Root role="label" htmlFor={textareaId}>
          {label}
        </Label.Root>
        {required && (
          <span title="Obrigatório" className="text-danger-01 mx-1">
            *
          </span>
        )}
        <textarea
          ref={ref}
          id={textareaId}
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
        {errorMessage && !disabled && <div className="input-error">{errorMessage}</div>}
      </div>
    );
  }
);

export default Textarea;
