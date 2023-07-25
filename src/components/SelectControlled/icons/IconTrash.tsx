import React from "react";

interface IIconTrash extends React.ComponentProps<"svg"> {
  size: number;
}

export function IconTrash({ size: sizes, className, ...rest }: IIconTrash) {
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
        x1={216}
        y1={60}
        x2={40}
        y2={60}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
      <line
        x1={104}
        y1={104}
        x2={104}
        y2={168}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
      <line
        x1={152}
        y1={104}
        x2={152}
        y2={168}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
      <path
        d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
      <path
        d="M168,60V36a16,16,0,0,0-16-16H104A16,16,0,0,0,88,36V60"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
      />
    </svg>
  );
}
