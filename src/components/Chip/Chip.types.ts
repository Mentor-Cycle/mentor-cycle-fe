import { ReactNode } from "react";

export type ChipProps = {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quartenary"
    | "primary_dark"
    | "secondary_dark";
  children: any;
  className: string;
  onClick?: () => void;
};
