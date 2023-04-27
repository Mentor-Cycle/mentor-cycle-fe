import { ReactNode } from "react";

export type ChipVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quartenary"
  | "primary_dark"
  | "secondary_dark";

export type ChipProps = {
  variant?: ChipVariant;
  children: any;
  className?: string;
  onClick?: () => void;
};
