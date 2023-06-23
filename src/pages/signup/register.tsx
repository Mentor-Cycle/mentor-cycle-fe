/* eslint-disable react-hooks/exhaustive-deps */
import { CenteredContainer } from "@components/CenteredContainer";
import FormSteps from "@components/FormSteps";
import Stepper from "@components/Stepper/Stepper";
import StepperVertical from "@components/StepperVertical";
import useForm from "@hooks/useForm";
import { Providers } from "pages/signup/_providers";
import { useFormContext } from "react-hook-form";

const Register = () => {
  const { currentStep } = useForm();

  const { watch } = useFormContext();

  const value = watch("value");
  console.log(value);

  return (
    <Providers>
      <main className="min-h-[130vh] flex flex-col">
        <section className="h-28 border-b border-gray-02 hidden sm:flex">
          <CenteredContainer className="flex items-center justify-between px-8 sm:px-12">
            <Stepper
              steps={[1, 2, 3]}
              currentStep={currentStep}
              className="hidden sm:block"
              size="regular"
            />
            <div className="max-w-xs">
              <h3 className="font-bold text-xl">Status do seu registro</h3>
              <p className="text-gray-02 text-xs w-3/4 md:block hidden">
                Acompanhe em qual parte do registro você se encontra
              </p>
            </div>
          </CenteredContainer>
        </section>
        <section className="">
          <CenteredContainer className="flex flex-col lg:flex-row justify-between px-8 sm:px-12 mt-12">
            <aside className="">
              <h2 className="text-primary-05 text-3xl font-semibold text-center lg:text-start">
                Registre-se aqui!
              </h2>
              <p className="text-gray-04 text-sm mt-2 mb-12 px-4 sm:px-0 text-center lg:w-3/4 lg:text-start">
                Preencha os campos para criar a sua conta e acessar a
                plataforma!
              </p>
              <StepperVertical
                currentStep={currentStep}
                className="hidden lg:block"
              />
            </aside>
            <section className="w-full m-auto lg:m-0 mb-24 lg:max-w-none max-w-[48rem]">
              <FormSteps />
            </section>
          </CenteredContainer>
        </section>
      </main>
    </Providers>
  );
};

export default Register;
