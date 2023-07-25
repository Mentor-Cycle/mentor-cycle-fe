import React from "react";

interface IModalSelectOptions extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function ModalSelectOptions({
  children,
  className,
  ...rest
}: IModalSelectOptions) {
  const _cn = ` ${className ?? ""}`;

  return (
    <div
      className={
        "absolute flex flex-col cursor-pointer w-full list-none rounded-b-lg shadow-md -translate-y-2" +
        _cn
      }
      {...rest}
    >
      {children}
    </div>
  );
}
