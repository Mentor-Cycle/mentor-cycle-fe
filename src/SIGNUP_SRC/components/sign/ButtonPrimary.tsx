import { Form } from "SIGNUP_SRC/components/Form";
import { IFormButton } from "SIGNUP_SRC/components/FormButton/component";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonPrimaryProps extends IFormButton {
  text: string;
}

export function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <Form.Button
      {...props}
      className={twMerge(
        "bg-primary-02 hover:bg-primary-01 disabled:bg-primary-04 focus:outline-primary-02 transition-colors duration-100",
        props.className
      )}
      tabIndex={props.tabIndex ?? 25}
    >
      {props.text}
    </Form.Button>
  );
}
