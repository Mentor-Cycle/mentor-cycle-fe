import { Form } from "@components/Form";
import { IFormButton } from "@components/FormButton/component";
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
        "text-primary-03 border border-primary-03",
        "hover:text-primary-01 border hover:border-primary-01",
        "active:text-primary-04 border active:border-primary-04",
        "bg-neutral-03",
        "sm:order-none order-1 transition-colors duration-100",
        "dark:bg-secondary-03 dark:border-neutral-03 dark:text-neutral-03",
        "dark:hover:bg-secondary-01",
        props.className
      )}
      tabIndex={props.tabIndex ?? 30}
    >
      {props.text ?? props.children ?? null}
    </Form.Button>
  );
}
// "sm:order-none order-1 focus:outline-gray-02 bg-neutral-05 border border-gray-02 hover:bg-secondary-01 transition-colors duration-100",
