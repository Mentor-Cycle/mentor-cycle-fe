import { Form } from "SIGNUP_SRC/components/Form";
import { IFormButton } from "SIGNUP_SRC/components/FormButton/component";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonSecondaryProps extends IFormButton {
  text?: string;
}

export function ButtonSecondary(props: ButtonSecondaryProps) {
  return (
    <Form.Button
      {...props}
      className={twMerge(
        "sm:order-none order-1 focus:outline-gray-04 bg-secondary-03 border border-gray-04 hover:bg-secondary-01 transition-colors duration-100",
        props.className
      )}
      tabIndex={props.tabIndex ?? 30}
    >
      {props.text ?? props.children ?? null}
    </Form.Button>
  );
}
