import { buttonVariant } from "@components/Button/Button.types";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export type Props = {
  description: string;
  buttonName: string;
  variant?: buttonVariant;
  onButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
