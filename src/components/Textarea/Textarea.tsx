import React, { useState, ChangeEvent } from "react";
import clsx from "clsx";
import { TextareaProps } from "./Textarea.types";
import * as Label from "@radix-ui/react-label";

const Textarea = ({ label, name, disabled, ...props }: TextareaProps) => {
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
      <textarea
        name={name}
        disabled={disabled}
        {...props}
        className={clsx(
          "w-full h-48 resize-none text-secondary-05",
          invalid && "input-invalid",
          "input-default"
        )}
        onBlur={handleBlur}
      />
      {errorMessage && !disabled && (
        <div className="input-error">{errorMessage}</div>
      )}
    </Label.Root>
  );
};

export default Textarea;
