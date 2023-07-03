import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IFormValues } from "SIGNUP_SRC/types";
import { defaultValues } from "SIGNUP_SRC/constants";
import { signupFormSchema } from "SIGNUP_SRC/forms/signup";
import { MultistepFormContext } from "SIGNUP_SRC/hooks/useMultistepForm";
import { SetStateAction, useCallback, useMemo, useState } from "react";

interface Props {
  children: JSX.Element;
}

const Providers = ({ children }: Props) => {
  const [formCurrentStep, setFormCurrentStep] = useState(0);
  const [isChoosingPlan, setIsChoosingPlan] = useState(true);

  const values = useMemo(
    () => ({ formCurrentStep, isChoosingPlan }),
    [formCurrentStep, isChoosingPlan]
  );

  const setFormCurrentStepMemo = useCallback(
    (newState: SetStateAction<number>) => setFormCurrentStep(newState),
    [setFormCurrentStep]
  );
  const setIsChoosingPlanStepMemo = useCallback(
    (newState: SetStateAction<boolean>) => setIsChoosingPlan(newState),
    [setIsChoosingPlan]
  );

  const methods = useForm<IFormValues>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(signupFormSchema),
  });

  return (
    <MultistepFormContext.Provider
      value={{
        ...values,
        setFormCurrentStep: setFormCurrentStepMemo,
        setIsChoosingPlan: setIsChoosingPlanStepMemo,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </MultistepFormContext.Provider>
  );
};

export default Providers;
