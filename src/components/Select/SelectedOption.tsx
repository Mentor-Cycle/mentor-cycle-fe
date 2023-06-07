import React from "react";

interface ISelectedOption extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function SelectedOption({
  children,
  className,
  ...rest
}: ISelectedOption) {
  const _cn = ` ${className ?? ""}`;

  return (
    <div
      className={"flex items-center gap-2 rounded-full font-normal" + _cn}
      {...rest}
    >
      {children}
    </div>
  );
}
