import React, { FC, useState } from "react";
import clsx from "clsx";
import { InputComponentProps, InputProps, InputSize } from "./Input.types";
import * as Label from "@radix-ui/react-label";
import { isPast, parse } from "date-fns";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputComponent {...props} forwardedRef={ref} />
));

const InputComponent: FC<InputComponentProps> = ({
  size = "standard",
  label,
  name,
  disabled,
  className,
  forwardedRef,
  onBlur,
  onValidChange,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleBlur = (event: any) => {
    if (onBlur) {
      onBlur(event);
    }

    const input = event.target;
    let newInvalid = !input.checkValidity();

    if (name === "birthDate") {
      const date = parse(input.value, "dd/MM/yyyy", new Date());
      const isDateInThePast = isPast(date);
      newInvalid = newInvalid || !isDateInThePast;
      setErrorMessage(
        !isDateInThePast
          ? "A data deve ser no passado."
          : input.validationMessage
      );
    } else {
      setErrorMessage(input.validationMessage);
    }

    setInvalid(newInvalid);
    if (onValidChange) {
      onValidChange(!newInvalid);
    }
  };

  const sizesInput: { [key in InputSize]: string } = {
    standard: `w-full px-6 py-4 my-2`,
    small: `flex flex-col px-4 py-4 my-2`,
  };

  const sizesLabel = {
    standard: `text-base w-full`,
    small: `text-sm`,
  };
  return (
    <Label.Root
      className={clsx(
        disabled && "input-label-disabled",
        "input-label",
        sizesLabel[size]
      )}
      htmlFor={name}
    >
      {label}
      {props.required && (
        <span title="Obrigatório" className="text-danger-01 mx-1">
          *
        </span>
      )}
      <input
        ref={forwardedRef}
        onKeyDown={handleKeyDown}
        name={name}
        disabled={disabled}
        {...props}
        className={clsx(
          "text-secondary-05",
          sizesInput[size],
          invalid && "input-invalid",
          "input-default"
        )}
        onBlur={handleBlur}
      />
      {errorMessage && !disabled && (
        <div className={"font-normal my-2 text-danger-01 text-sm"}>
          {errorMessage}
        </div>
      )}
    </Label.Root>
  );
};

export default Input;
