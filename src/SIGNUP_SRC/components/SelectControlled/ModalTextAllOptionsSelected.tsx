import React from "react";

interface IModalTextAllOptionsSelected extends React.ComponentProps<"p"> {
  children: React.ReactNode;
}

export function ModalTextAllOptionsSelected({
  children,
  className,
  ...rest
}: IModalTextAllOptionsSelected) {
  const _cn = ` ${className ?? ""}`;

  return (
    <p className={className} {...rest}>
      {children}
    </p>
  );
}
