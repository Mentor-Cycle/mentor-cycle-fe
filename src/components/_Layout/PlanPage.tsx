import Button from "@components/Button";
import ProfileCardToggle from "@components/ProfileCardToggle";
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import Link from "next/link";
import React from "react";

export const PlanPage = () => {
  const { setIsChoosingPlan } = useMultistepForm();

  const handleNext = () => {
    setIsChoosingPlan(false);
  };

  return (
    <main className=" min-h-screen flex flex-col items-center">
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
        <div className="flex flex-col p-2 sm:p-0 sm:flex-row justify-between gap-8 sm:gap-4 mb-40">
          <Link href="/signin" legacyBehavior>
            <Button variant="secondary" className="order-last sm:order-first">
              Voltar
            </Button>
          </Link>
          <Button onClick={handleNext}>Próximo</Button>
        </div>
      </section>
    </main>
  );
};
