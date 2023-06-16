import { buttonVariant } from "@components/Button/Button.types";

export type TStepButtons = {
  [key: number]: {
    text: string;
    variant: buttonVariant;
  };
};
