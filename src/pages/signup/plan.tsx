import Button from "@components/Button";
import ProfileCardToggle from "@components/ProfileCardToggle";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Plan = () => {
  const [isMentor, setIsMentor] = useState(false);
  const router = useRouter();
  const handleIsMentor = (isMentor: boolean) => {
    setIsMentor(isMentor);
  };

  const handleNext = () => {
    localStorage.setItem("isMentor", JSON.stringify(isMentor));
    router.replace({
      pathname: "/signup/register",
    });
  };

  return (
    <main className="bg-neutral-03 min-h-screen flex flex-col items-center">
      <section className="max-w-2xl mt-20">
        <div>
          <h1 className="text-primary-05 text-2xl sm:text-5xl text-center">
            Escolha o modelo de usuário que deseja seguir
          </h1>
          <p className="text-gray-04 text-sm text-center mt-2 mb-8">
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
          <Button variant="secondary" className="order-last sm:order-first">
            <Link href="/">Voltar</Link>
          </Button>
          <Button onClick={handleNext}>Próximo</Button>
        </div>
      </section>
    </main>
  );
};

export default Plan;
