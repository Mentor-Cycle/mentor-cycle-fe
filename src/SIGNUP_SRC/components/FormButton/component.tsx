import React, { ButtonHTMLAttributes } from "react";

interface IFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function FormButton({ children, className, ...rest }: IFormButton) {
  const _cn = className ? ` ${className}` : "";

  return (
    <button
      type={rest.type ?? "button"}
      className={
        "my-1 px-3 min-h-[3rem] rounded-lg text-neutral-02 focus:outline-1 focus:outline-offset-2 basis-0 min-w-0 grow font-medium" +
        _cn
      }
      tabIndex={rest.tabIndex ?? 25}
      {...rest}
    >
      {children ?? null}
    </button>
  );
}
