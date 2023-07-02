import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IconX } from "SIGNUP_SRC/components/SelectControlled/icons/IconX";
import { OverrideConflict } from "types/overrideConflictTypes";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormTrigger,
  useFormContext,
} from "react-hook-form";
import { IFormValues } from "SIGNUP_SRC/types";

interface InputCheckboxProps
  extends OverrideConflict<
    ButtonHTMLAttributes<HTMLButtonElement>,
    ControllerRenderProps
  > {
  label: React.ReactNode;
  id: string;
  disabled?: boolean;
  required?: boolean;
}

export const InputCheckbox = React.forwardRef<HTMLButtonElement, InputCheckboxProps>(
  function InputCheckboxComponent(
    { required, onChange, disabled, label, id, onBlur, name, value, ...rest },
    ref
  ) {
    const { trigger } = useFormContext<IFormValues>();

    const handleOnCheckedChange = (checked: Checkbox.CheckedState) => {
      onChange(checked);
      void trigger(name as FieldPath<IFormValues>, { shouldFocus: true });
    };

    return (
      <div className="flex gap-2 [&_strong]:text-primary-01 [&_strong]:font-normal">
        <Checkbox.Root
          {...rest}
          defaultChecked={value}
          ref={ref}
          onCheckedChange={handleOnCheckedChange}
          onBlur={onBlur}
          id={id}
          className={twMerge(
            "shrink-0 h-[22px] basis-[22px] grid place-items-center my-0.5 appearance-none rounded bg-secondary-04 border border-gray-05 outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2",
            rest.className
          )}
        >
          <Checkbox.Indicator className="text-gray-01">
            <IconX size={12} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className="flex-1 text-sm"
          htmlFor={id}
          style={{
            color: "#989898", // gray-02
          }}
        >
          {label}
        </label>
      </div>
    );
  }
);
