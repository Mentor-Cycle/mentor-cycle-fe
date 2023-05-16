import React, { FC, useState } from "react";
import clsx from "clsx";
import { InputComponentProps, InputProps, InputSize } from "./Input.types";
import { AiOutlineSearch } from "react-icons/ai";
import * as Label from "@radix-ui/react-label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  search,
  mask,
  type,
  onBlur,
  onValidChange,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isPasswordVisible ? "text" : "password";

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    const { validity, validationMessage } = event.target;
    const newInvalid = !validity.valid;

    setInvalid(newInvalid);
    setErrorMessage(newInvalid ? validationMessage : "");

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
      <div className="flex items-center relative">
        <input
          ref={forwardedRef}
          type={type === "password" ? inputType : type}
          name={name}
          disabled={disabled}
          {...props}
          className={clsx(
            "text-secondary-05",
            sizesInput[size],
            search && "pl-[72px]",
            type === "password" && "pr-[52px]",
            invalid && "input-invalid",
            "input-default"
          )}
          onBlur={handleBlur}
        />
        {type === "password" && (
          <button
            tabIndex={-1}
            type="button"
            className="absolute right-0 top-0 bottom-0 px-6 flex items-center focus:outline-none"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <AiOutlineEye
                size="26px"
                className="text-secondary-05 opacity-50"
              />
            ) : (
              <AiOutlineEyeInvisible
                size="26px"
                className="text-secondary-05 opacity-50"
              />
            )}
          </button>
        )}
        {search && (
          <div className="absolute left-0 top-0 bottom-0 px-6 flex items-center pointer-events-none">
            <AiOutlineSearch size="28px" className="text-secondary-05" />
          </div>
        )}
      </div>
      {errorMessage && !disabled && name !== "repeatPassword" && (
        <div className={"font-normal my-2 text-danger-01 text-sm"}>
          {errorMessage}
        </div>
      )}
    </Label.Root>
  );
};

export default Input;
