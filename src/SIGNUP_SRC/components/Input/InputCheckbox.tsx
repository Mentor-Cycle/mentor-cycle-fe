import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@components/icons/CheckIcon";
import { OverrideConflict } from "types/overrideConflictTypes";
import { ControllerRenderProps, FieldPath, useFormContext } from "react-hook-form";
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
      trigger(name as FieldPath<IFormValues>, { shouldFocus: true });
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
            "shrink-0 h-[22px] basis-[22px] grid place-items-center my-0.5 appearance-none rounded outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 bg-transparent border border-gray-03",
            "data-[state=checked]:bg-neutral-05 data-[state=checked]:border-gray-03",
            rest.className
          )}
        >
          <Checkbox.Indicator className="text-secondary-05">
            <CheckIcon size={12} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className="flex-1 text-sm"
          htmlFor={id}
          style={{
            color: "var(--gray-03)",
          }}
        >
          {label}
        </label>
      </div>
    );
  }
);
