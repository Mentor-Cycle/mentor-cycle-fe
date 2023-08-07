import { HTMLAttributes } from "react";

export type ChipVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quartenary"
  | "primary_dark"
  | "secondary_dark"
  | "outlined"
  | "chipCards"
  | "chipCardsMentors"
  | "chipCanceled"
  | "chipRealized";

export interface ChipProps {
  children: string;
  variant?: ChipVariant;
  size?: "small" | "auto";
}

export type ChipElementProps = ChipProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "children">;
