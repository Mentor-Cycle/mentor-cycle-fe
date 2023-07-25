import React, { useId, useState } from "react";
import clsx from "clsx";
import { InputProps, InputSize } from "./Input.types";
import { AiOutlineSearch } from "react-icons/ai";
import * as Label from "@radix-ui/react-label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const InputElement = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "standard", label, search, mask, type, onValidChange, ...props }, ref) => {
    const inputId = useId();
    const [invalid, setInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputType = isPasswordVisible ? "text" : "password";

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (props.onBlur) {
        props.onBlur(event);
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
      <div
        className={clsx(
          props.disabled && "input-label-disabled",
          "input-label",
          sizesLabel[size]
        )}
      >
        <Label.Root role="label" htmlFor={inputId}>
          {label}
        </Label.Root>
        {props.required && (
          <span title="Obrigatório" className="text-danger-01 mx-1">
            *
          </span>
        )}
        <div className="flex items-center relative">
          <input
            {...props}
            id={inputId}
            ref={ref}
            type={type === "password" ? inputType : type}
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
                <AiOutlineEye size="26px" className="text-secondary-05 opacity-50" />
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
              <AiOutlineSearch
                size="28px"
                className="text-secondary-05 dark:text-neutral-02"
              />
            </div>
          )}
        </div>
        {errorMessage && !props.disabled && props.name !== "repeatPassword" && (
          <div className={"font-normal my-2 text-danger-01 text-sm"}>{errorMessage}</div>
        )}
      </div>
    );
  }
);

InputElement.displayName = "InputElement";
