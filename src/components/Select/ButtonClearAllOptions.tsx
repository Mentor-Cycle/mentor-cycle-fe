import React from "react";

interface IButtonClearAllOptions extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export function ButtonClearAllOptions({
  children,
  className,
  ...rest
}: IButtonClearAllOptions) {
  const _cn = ` ${className ?? ""}`;

  return (
    <button
      type="button"
      className={
        "p-1.5 rounded-full absolute right-4 top-1/2 -translate-y-1/2" + _cn
      }
      {...rest}
    >
      {children}
    </button>
  );
}
