import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface MultistepFormContextInterface {
  formCurrentStep: number;
  setFormCurrentStep: Dispatch<SetStateAction<number>>;
}

export const MultistepFormContext = createContext(
  {} as MultistepFormContextInterface
);

export const useMultistepForm = () => useContext(MultistepFormContext);
