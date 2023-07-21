import React, { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

export interface IFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export function FormButton({ asChild, children, ...rest }: IFormButton) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      {...rest}
      type={rest.type ?? "button"}
      tabIndex={rest.tabIndex ?? 25}
      className={twMerge(
        "grid place-items-center my-1 px-3 min-h-[3rem] rounded-lg text-neutral-02 focus:outline-1 focus:outline-offset-2 basis-0 min-w-0 grow font-medium",
        rest.className
      )}
    >
      {children ?? null}
    </Component>
  );
}
