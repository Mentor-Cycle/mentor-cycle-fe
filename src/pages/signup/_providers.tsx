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

const Providers = ({ children }: Props) => {
  const [formCurrentStep, setFormCurrentStep] = useState(0);

  const methods = useForm<IFormValues>({
    defaultValues,
    mode: "onTouched",
    // resolver: zodResolver(signupFormSchema),
  });

  return (
    <MultistepFormContext.Provider
      value={{ formCurrentStep, setFormCurrentStep }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </MultistepFormContext.Provider>
  );
};

export default Providers;
