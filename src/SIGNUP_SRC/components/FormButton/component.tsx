import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function FormButton({ children, ...rest }: IFormButton) {
  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      tabIndex={rest.tabIndex ?? 25}
      className={twMerge(
        "my-1 px-3 min-h-[3rem] rounded-lg text-neutral-02 focus:outline-1 focus:outline-offset-2 basis-0 min-w-0 grow font-medium",
        rest.className
      )}
    >
      {children ?? null}
    </button>
  );
}
