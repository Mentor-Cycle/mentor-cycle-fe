import React, { FC, useState, ChangeEvent } from "react";
import clsx from "clsx";
import { InputComponentProps, InputProps, InputSize } from "./Input.types";
import * as Label from "@radix-ui/react-label";

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
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setInvalid(!event.target.checkValidity() || !event.target.value);
    setErrorMessage(event.target.validationMessage || "");
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
        name={name}
        disabled={disabled}
        {...props}
        className={clsx(
          sizesInput[size],
          invalid && "input-invalid",
          "input-default"
        )}
        onBlur={handleBlur}
        disabled={disabled}
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
