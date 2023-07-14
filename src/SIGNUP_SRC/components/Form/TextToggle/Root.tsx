import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Root = React.forwardRef<HTMLDivElement, RootProps>(function RootComponent(
  { children, ...props }: RootProps,
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={twMerge("absolute right-0 top-0 flex items-center", props.className)}
    >
      {children}
    </div>
  );
});
