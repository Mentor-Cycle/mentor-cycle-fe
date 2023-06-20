import React from "react";

interface IButtonRemoveSelectedOption extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export function ButtonRemoveSelectedOption({
  children,
  className,
  ...rest
}: IButtonRemoveSelectedOption) {
  const _cn = ` ${className ?? ""}`;

  return (
    <button
      className={"grid place-items-center rounded-full p-[3px]" + _cn}
      {...rest}
    >
      {children}
    </button>
  );
}
