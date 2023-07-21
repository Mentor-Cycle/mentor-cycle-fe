import { CenteredContainer } from "@components/CenteredContainer";
import ProfileCardToggle from "@components/ProfileCardToggle";
import { Form } from "@components/Form";
import { Sign } from "@components/sign";
import { useMultistepForm } from "@hooks/useMultistepForm";
import React from "react";
import { useFormContext } from "react-hook-form";

export const PlanPage = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const { setIsChoosingPlan } = useMultistepForm();

  const handleGoBack = () => {
    setIsChoosingPlan(false);
  };

  return (
    <CenteredContainer className="min-h-screen flex flex-col items-center px-8">
      <section className="max-w-2xl mt-20">
        <div>
          <h1 className="text-primary-05 dark:text-neutral-01 text-2xl sm:text-5xl text-center">
            Escolha o modelo de usuário que deseja seguir
          </h1>
          <p className="text-gray-04 dark:text-gray-01 text-sm text-center mt-2 mb-8">
            Aqui você vai criar o modelo da sua conta.
          </p>
        </div>
        <div className="mb-32">
          <ProfileCardToggle />
        </div>
        <Form.MultipleInRow className="mb-32">
          <Sign.ButtonSecondary onClick={handleGoBack}>Voltar</Sign.ButtonSecondary>
          <Sign.ButtonPrimary type="submit" disabled={isSubmitting} text="Enviar" />
        </Form.MultipleInRow>
      </section>
    </CenteredContainer>
  );
};
