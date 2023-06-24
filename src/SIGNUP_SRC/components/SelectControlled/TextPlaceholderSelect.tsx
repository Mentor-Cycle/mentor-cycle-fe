import React from "react";

interface ITextPlaceholderSelect extends React.ComponentProps<"p"> {
  children: React.ReactNode;
}

export function TextPlaceholderSelect({
  children,
  className,
  ...rest
}: ITextPlaceholderSelect) {
  const _cn = ` ${className ?? ""}`;

  return (
    <p className={className} {...rest}>
      {children}
    </p>
  );
}
