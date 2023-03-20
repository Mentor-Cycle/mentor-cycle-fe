import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import StepperVertical from "@components/StepperVertical";
import FormSteps from "@components/registerForm";
import Stepper from "@components/Stepper";
import { Button } from "@components/Button";
import clsx from "clsx";
import { useRouter } from "next/router";

const Register = () => {
  const [stepForm, setStepForm] = useState<number>(1);
  const router = useRouter();
  const { isMentor } = router.query;

  return (
    <>
      <header className="bg-neutral-01 w-full h-[80px] flex justify-between items-center px-36">
        <Image alt="logo mentor cycle" src={logo} width={53} height={48} />
        <p>Precisa de ajuda?</p>
      </header>
      <main className="bg-neutral-03 min-h-screen flex flex-col">
        <section className="bg-neutral-01 border-opacity-30 border-t border-b border-gray-02 w-full py-[52px] flex justify-between px-36">
          <Stepper steps={[1, 2, 3]} currentStep={stepForm} />
          <div className="max-w-xs">
            <h3 className="font-bold">Status do seu registro</h3>
            <p className="text-gray-02 text-xs w-3/4">
              Acompanhe em qual parte do registro você se encontra
            </p>
          </div>
        </section>
        <section className=" w-full flex justify-between mt-12 px-36">
          <aside>
            <h2 className="text-primary-05 text-3xl font-semibold">
              Registre-se aqui!
            </h2>
            <p className="text-gray-04 text-sm mt-2 mb-12  w-3/4">
              Preencha os campos para criar a sua conta e acessar a plataforma!
            </p>
            <StepperVertical currentStep={stepForm} />
          </aside>
          <section className="max-w-2xl w-full mb-24">
            <FormSteps
              stepForm={stepForm}
              setStepForm={setStepForm}
              isMentor={Boolean(isMentor)}
            />
          </section>
        </section>
      </main>
    </>
  );
};

export default Register;
