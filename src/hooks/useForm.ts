import { useContext } from "react";
import { IMultiStepFormContext, MultiStepFormContext } from "Providers/form";

export const useMultiStepFormContext = (): IMultiStepFormContext => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepFormProvider"
    );
  }
  return context;
};
