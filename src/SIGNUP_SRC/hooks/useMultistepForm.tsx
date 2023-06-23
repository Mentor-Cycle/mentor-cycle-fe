import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface MultistepFormContextInterface {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export const MultistepFormContext = createContext(
  {} as MultistepFormContextInterface
);

export const useMultistepForm = () => useContext(MultistepFormContext);
