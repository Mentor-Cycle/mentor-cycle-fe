import { FC, useState, ChangeEvent } from "react";
import clsx from "clsx";
import { DateProps, DateSize } from "./Date.types";
import * as Label from "@radix-ui/react-label";
import InputMask from "react-input-mask";
import { isValidDate } from "./dateHelpers";
import useForm from "@hooks/useForm";
import { ActionType } from "providers/form";

const InputBirthday: FC<DateProps> = ({
  size = "standard",
  label,
  name,
  disabled,
  value,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState<string>("1990-01-01T00:00:00.000Z");
  const { formData, dispatch } = useForm();

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const isValidBirthDate = isValidDate(event.target.value);
    setInvalid(!isValidBirthDate);
    setErrorMessage(isValidBirthDate ? "" : "Data de nascimento inválida.");
    console.log(isValidBirthDate);
    if (isValidBirthDate) {
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          birthDate: date,
        },
      });
    } else {
      setDate("1990-01-01T00:00:00.000Z");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
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
        value={value}
        onChange={handleChange}
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

export default InputBirthday;
