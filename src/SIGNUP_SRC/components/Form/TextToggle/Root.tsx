import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RootProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Root({ children, ...props }: RootProps) {
  return (
    <div
      {...props}
      className={twMerge("absolute right-0 top-0 flex items-center", props.className)}
    >
      {children}
    </div>
  );
}
