import { FC, useState, ChangeEvent } from "react";
import clsx from "clsx";
import { DateSize, InputBirthdayProps } from "./Date.types";
import * as Label from "@radix-ui/react-label";
import InputMask from "react-input-mask";
import { isValidDate } from "./dateHelpers";

const InputBirthday: FC<InputBirthdayProps> = ({
  size = "standard",
  label,
  name,
  disabled,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Mocked! Needs to be refactored
  const updateBirthday = () => {};
  const formData = { birthDate: "" };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const isValidBirthDate = event.target.value === "" || isValidDate(event.target.value);
    setInvalid(!isValidBirthDate);
    setErrorMessage(isValidBirthDate ? "" : "Data de nascimento inválida.");
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

      <InputMask
        mask="99/99/9999"
        name={name}
        value={formData.birthDate || undefined}
        onChange={updateBirthday}
        {...props}
        className={clsx(sizesDate[size], invalid && "input-invalid", "input-default")}
        onBlur={handleBlur}
        disabled={disabled}
        pattern="\d{2}/\d{2}/\d{4}"
      />
      {errorMessage && !disabled && (
        <div className={"font-normal my-2 text-danger-01 text-sm"}>{errorMessage}</div>
      )}
    </Label.Root>
  );
};

export default InputBirthday;
