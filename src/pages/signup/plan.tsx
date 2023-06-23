import Button from "@components/Button";
import ProfileCardToggle from "@components/ProfileCardToggle";
import useForm from "@hooks/useForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { Providers } from "pages/signup/_providers";
import { ActionType } from "providers/form";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const Plan = () => {
  const { dispatch, formData, setFormStorage, formStorage } = useForm();
  const [isMentor, setIsMentor] = useState(false);
  const router = useRouter();
  const { watch } = useFormContext();

  const value = watch("value");
  console.log(value);

  const handleIsMentor = (isMentor: boolean) => {
    setIsMentor(isMentor);
  };

  const handleNext = () => {
    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: {
        ...formData,
        isMentor,
      },
    });
    setFormStorage({
      ...formStorage,
      isMentor,
    });
    router.replace({
      pathname: "/signup/register",
    });
  };

  return (
    <Providers>
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
            <ProfileCardToggle
              handleIsMentor={handleIsMentor}
              isMentor={isMentor}
            />
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
    </Providers>
  );
};

export default Plan;
