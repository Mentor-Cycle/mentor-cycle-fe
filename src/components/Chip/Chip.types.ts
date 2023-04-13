import { ReactNode } from "react";

export type ChipProps = {
  variant: "primary" | "secondary" | "tertiary" | "quartenary";
  children: ReactNode;
};
