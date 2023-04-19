import React, { FC, useState } from "react";
import clsx from "clsx";
import { InputComponentProps, InputProps, InputSize } from "./Input.types";
import * as Label from "@radix-ui/react-label";
import { AiOutlineSearch } from "react-icons/ai";

// eslint-disable-next-line react/display-name
const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <InputComponent {...props} forwardedRef={ref} />
);

const InputComponent: FC<InputComponentProps> = ({
  size = "standard",
  label,
  name,
  disabled,
  className,
  forwardedRef,
  placeholder,
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

    setInvalid(newInvalid);
    if (onValidChange) {
      onValidChange(!newInvalid);
    }
    if (newInvalid) {
      setErrorMessage(input.validationMessage);
    } else {
      setErrorMessage("");
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
      <div className="flex items-center relative">
        <input
          ref={forwardedRef}
          onKeyDown={handleKeyDown}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
          className={clsx(
            "text-secondary-05 pl-[72px]",
            sizesInput[size],
            invalid && "input-invalid",
            "input-default"
          )}
          onBlur={handleBlur}
        />
        <div className="absolute left-0 top-0 bottom-0 px-6 flex items-center pointer-events-none">
          <AiOutlineSearch size="28px" className="text-secondary-05" />
        </div>
      </div>
      {label && (
        <div
          className="absolute left-0 top-0 text-secondary-05 px-6 py-1 pointer-events-none"
          style={{ transform: "translate(0, 50%)" }}
        >
          {label}
          {props.required && (
            <span title="Obrigatório" className="text-danger-01 mx-1">
              *
            </span>
          )}
        </div>
      )}
      {errorMessage && !disabled && (
        <div className={"font-normal my-2 text-danger-01 text-sm"}>
          {errorMessage}
        </div>
      )}
    </Label.Root>
  );
};

export default InputSearch;
