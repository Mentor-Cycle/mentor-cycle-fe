import { Dispatch, SetStateAction } from "react";

export interface StepperVerticalProps {
  steps?: string[];
  currentStep?: number;
  className?: string;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
  clickable?: boolean;
}
