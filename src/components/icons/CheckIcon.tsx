import React from "react";

interface ICheckIcon extends React.ComponentProps<"svg"> {
  size: number;
}

export function CheckIcon({ size: sizes, className, ...rest }: ICheckIcon) {
  const _cn = ` ${className ?? ""}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={"" + _cn}
      width={sizes}
      height={sizes}
      {...rest}
    >
      <rect width={256} height={256} fill="none" />
      <polyline
        points="40 144 96 200 224 72"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
    </svg>
  );
}
