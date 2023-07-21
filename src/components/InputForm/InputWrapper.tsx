import React, { CSSProperties, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
  grow?: number;
  children: React.ReactNode;
  disabled?: boolean;
}

export function InputWrapper({
  disabled,
  grow,
  children,
  style,
  ...rest
}: InputWrapperProps) {
  const _st = style ?? {};

  return (
    <div
      {...rest}
      data-disabled={disabled}
      className={twMerge(
        "flex flex-col outline-none grow-[var(--grow)] min-w-0 basis-0 data-[disabled=true]:cursor-not-allowed",
        rest.className
      )}
      style={{ "--grow": grow, ..._st } as CSSProperties}
    >
      {children}
    </div>
  );
}
