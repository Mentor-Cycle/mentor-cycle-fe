import React, { CSSProperties, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface OptionsContainerProps extends HTMLAttributes<HTMLDivElement> {
  optionsColor?: string;
  optionsHoverBackgroundColor?: string;
  optionSelected?: string;
  children: React.ReactNode;
}

export function OptionsContainer({
  children,
  optionsColor = "#CECECE",
  optionsHoverBackgroundColor = "#343434",
  optionSelected = "#3E3E3E",
  ...props
}: OptionsContainerProps) {
  return (
    <div
      {...props}
      className={twMerge("flex p-0.5 rounded-full relative z-10", props.className)}
      style={
        {
          "--optionsColor": optionsColor,
          "--optionsHoverBackgroundColor": optionsHoverBackgroundColor,
          "--optionSelected": optionSelected,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
