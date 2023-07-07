import Button from "@components/Button";
import { CenteredContainer } from "@components/CenteredContainer";
import ProfileCardToggle from "@components/ProfileCardToggle";
import { Form } from "SIGNUP_SRC/components/Form";
import { Sign } from "SIGNUP_SRC/components/sign";
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import Link from "next/link";
import React from "react";

export const PlanPage = () => {
  const { setIsChoosingPlan } = useMultistepForm();

  const handleNext = () => {
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
        <Form.MultipleInRow className="is-form mb-32">
          <Sign.ButtonSecondary asChild>
            <Link href="/signin">Voltar</Link>
          </Sign.ButtonSecondary>
          <Sign.ButtonPrimary onClick={handleNext} text="Próximo" />
        </Form.MultipleInRow>
      </section>
    </CenteredContainer>
  );
};
