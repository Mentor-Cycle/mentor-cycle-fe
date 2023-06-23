import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IFormValues } from "SIGNUP_SRC/types";
import { defaultValues } from "SIGNUP_SRC/constants";
import { signupFormSchema } from "SIGNUP_SRC/formSchema";
import { MultistepFormContext } from "SIGNUP_SRC/hooks/useMultistepForm";
import { useState } from "react";

interface Props {
  children: JSX.Element;
}

export const Providers = ({ children }: Props) => {
  const [step, setStep] = useState(0);

  const methods = useForm<IFormValues>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(signupFormSchema),
  });

  return (
    <MultistepFormContext.Provider value={{ step, setStep }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </MultistepFormContext.Provider>
  );
};
