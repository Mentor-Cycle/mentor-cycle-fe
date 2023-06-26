import React, { CSSProperties, HTMLAttributes } from "react";

interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
  grow?: number;
  children: React.ReactNode;
}

export function InputWrapper({
  grow,
  children,
  className,
  style,
  ...rest
}: InputWrapperProps) {
  const _st = style ?? {};
  const _cn = className ? ` ${className}` : "";

  return (
    <div
      className={
        "flex flex-col outline-none grow-[var(--grow)] min-w-0 basis-0" + _cn
      }
      style={{ "--grow": grow, ..._st } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
