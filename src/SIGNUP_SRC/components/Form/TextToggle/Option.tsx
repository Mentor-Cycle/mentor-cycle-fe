import React, { ButtonHTMLAttributes, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  option: string;
  optionSelected: string;
}

export function Option({ optionSelected, option, ...props }: OptionProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const name = buttonRef.current?.name;

  return (
    <button
      {...props}
      ref={buttonRef}
      type="button"
      className={twMerge(
        `py-1.5 px-3.5 text-sm leading-none rounded-full`,
        props.className,
        optionSelected === name
          ? "bg-[var(--optionSelected)]"
          : "hover:bg-[var(--optionsHoverBackgroundColor)]"
      )}
      style={{
        color: "var(--optionsColor)",
      }}
    >
      {option}
    </button>
  );
}
