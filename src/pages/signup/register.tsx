import StepperVertical from "@components/StepperVertical";
import FormSteps from "@components/FormSteps";
import Stepper from "@components/Stepper";
import { MultiStepFormProvider } from "Providers/form";
import Header from "@components/Header/Header";
import useForm from "@hooks/useForm";
import { StepperWithContext } from "@components/Stepper/Stepper";

const Register = () => {
  const { currentStep } = useForm();
  return (
    <MultiStepFormProvider>
      <Header isLogged userName="tonon" />
      <main className="bg-neutral-03 min-h-[130vh] flex flex-col">
        <section className="bg-neutral-01 border-opacity-30 border-t border-b border-gray-02 w-full py-[52px] sm:justify-between 2xl:justify-around sm:px-8 lg:px-20 2xl:px-36 hidden sm:flex">
          <StepperWithContext steps={[1, 2, 3]} className="hidden sm:block" />
          <div className="max-w-xs">
            <h3 className="font-bold text-xl">Status do seu registro</h3>
            <p className="text-gray-02 text-xs w-3/4">
              Acompanhe em qual parte do registro você se encontra
            </p>
          </div>
        </section>
        <section className="w-full flex flex-col lg:flex-row justify-between 2xl:justify-evenly md:mt-12 lg:px-20 2xl:px-36 mb-20">
          <aside className="pt-10 md:pt-0">
            <h2 className="text-primary-05 text-3xl font-semibold text-center lg:text-start">
              Registre-se aqui!
            </h2>
            <p className="text-gray-04 text-sm mt-2 mb-12 px-4 sm:px-0 text-center lg:w-3/4 lg:text-start">
              Preencha os campos para criar a sua conta e acessar a plataforma!
            </p>
            <StepperVertical className="hidden lg:block" />
          </aside>
          <section className="max-w-2xl w-full m-auto lg:m-0 mb-24 px-4">
            <FormSteps />
          </section>
        </section>
      </main>
    </MultiStepFormProvider>
  );
};

export default Register;
