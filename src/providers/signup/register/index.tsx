import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IFormValues } from "SIGNUP_SRC/types";
import { defaultValues } from "SIGNUP_SRC/constants";
import { signupFormSchema } from "SIGNUP_SRC/forms/signup";
import { MultistepFormContext } from "SIGNUP_SRC/hooks/useMultistepForm";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "services/apollo/mutations";
import { useRouter } from "next/router";

interface Props {
  children: JSX.Element;
}

const Providers = ({ children }: Props) => {
  const [formCurrentStep, setFormCurrentStep] = useState(0);
  const [isChoosingPlan, setIsChoosingPlan] = useState(false);
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);

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

  const submitHandler: SubmitHandler<IFormValues> = async (formData) => {
    const { repeatPassword, isTermsAccepted, ...createUserPayload } = formData;

    try {
      const response = await toast.promise(
        createUser({
          variables: {
            input: createUserPayload,
          },
        }),
        {
          pending: "Aguarde um momento...",
          success: `Usuário ${
            formData.firstName ? formData.firstName : "MentorCycle"
          } cadastrado com sucesso!`,
        }
      );
      if (response.data.signUpUser) {
        localStorage.removeItem("form-data");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getErrorMessage = (error: any) => {
    const errorMessages: Record<string, string> = {
      description: "A descrição precisa ter no mínimo 2 caracteres",
      email: "Este email já possui cadastro",
    };

    for (const key in errorMessages) {
      if (error.message.includes(key)) {
        return errorMessages[key];
      }
    }

    return error instanceof Error
      ? error.message
      : "Não foi possivel concluir o cadastro, tente novamente mais tarde";
  };

  return (
    <MultistepFormContext.Provider
      value={{
        ...values,
        setFormCurrentStep: setFormCurrentStepMemo,
        setIsChoosingPlan: setIsChoosingPlanStepMemo,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
      </FormProvider>
    </MultistepFormContext.Provider>
  );
};

export default Providers;
