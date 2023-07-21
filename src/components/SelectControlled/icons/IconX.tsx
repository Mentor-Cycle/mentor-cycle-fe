import React from "react";

interface IIconX extends React.ComponentProps<"svg"> {
  size: number;
}

export function IconX({ size: sizes, className, ...rest }: IIconX) {
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
      <line
        x1={200}
        y1={56}
        x2={56}
        y2={200}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
      <line
        x1={200}
        y1={200}
        x2={56}
        y2={56}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
    </svg>
  );
}
