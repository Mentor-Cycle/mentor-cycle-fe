import { FC, useState, ChangeEvent } from "react";
import clsx from "clsx";
import { DateProps, DateSize } from "./Date.types";
import * as Label from "@radix-ui/react-label";

const DateInput: FC<DateProps> = ({
  size = "standard",
  label,
  name,
  disabled,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setInvalid(!event.target.checkValidity() || !event.target.value);
    setErrorMessage(event.target.validationMessage || "");
  };

  const sizesDate: { [key in DateSize]: string } = {
    standard: `w-full px-6 py-4 my-2`,
    small: `flex w-1/4 px-4 py-4 my-2`,
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
      <input
        name={name}
        type="date"
        {...props}
        className={clsx(
          sizesDate[size],
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

export default DateInput;
