import { Form } from "@components/Form";
import { IFormButton } from "@components/FormButton/component";
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
        "bg-primary-03 hover:bg-primary-01 disabled:bg-gray-02 focus:outline-primary-03 transition-colors active:bg-primary-04 duration-100",
        props.className
      )}
      tabIndex={props.tabIndex ?? 25}
    >
      {props.text}
    </Form.Button>
  );
}
