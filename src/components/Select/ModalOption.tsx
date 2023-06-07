import React from "react";

interface IModalOption extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export function ModalOption({ children, className, ...rest }: IModalOption) {
  const _cn = ` ${className ?? ""}`;

  return (
    <button className={"text-left" + _cn} {...rest}>
      {children}
    </button>
  );
}
