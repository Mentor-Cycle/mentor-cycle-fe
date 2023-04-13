import { Dispatch, SetStateAction } from "react";

export type ToggleProps = {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
};
