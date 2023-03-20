import { Button } from "@components/Button";
import ProfileCardToggle from "@components/ProfileCardToggle";
import Link from "next/link";
import React, { useState } from "react";

const Plan = () => {
  const [isMentor, setIsMentor] = useState(false);

  const handleIsMentor = (isMentor: boolean) => {
    setIsMentor(isMentor);
  };
  return (
    <main className="bg-neutral-03 min-h-screen flex flex-col items-center">
      <section className="max-w-2xl mt-20">
        <div>
          <h1 className="text-primary-05 text-5xl text-center">
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
        <div className="flex justify-between gap-4 mb-40">
          <Link href={"/signin"} legacyBehavior>
            <Button variant="secondary">Voltar</Button>
          </Link>
          <Link href={`/signup/register?isMentor=${isMentor}`} legacyBehavior>
            <Button>Próximo</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Plan;
