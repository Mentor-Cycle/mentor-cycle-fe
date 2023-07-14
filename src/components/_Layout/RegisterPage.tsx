/* eslint-disable react-hooks/exhaustive-deps */
import { CenteredContainer } from "@components/CenteredContainer";
import Stepper from "@components/Stepper/Stepper";
import StepperVertical from "@components/StepperVertical";
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import { Personal } from "SIGNUP_SRC/steps/Personal";
import { IFormValues } from "SIGNUP_SRC/types";
import { useFormContext } from "react-hook-form";
import { Location } from "SIGNUP_SRC/steps/Location";
import { Professional } from "SIGNUP_SRC/steps/Professional";
import { useCountriesFactory } from "SIGNUP_SRC/steps/factories/useCountriesFactory";
import { useStatesFactory } from "SIGNUP_SRC/steps/factories/useStatesFactory";
import { useCitiesFactory } from "SIGNUP_SRC/steps/factories/useCitiesFactory";
import { useSkillsFactory } from "SIGNUP_SRC/steps/factories/useSkillsFactory";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";
import { IUseGeoCities } from "SIGNUP_SRC/hooks/useGeoCities/types";
import { Form } from "SIGNUP_SRC/components/Form";
import { Sign } from "SIGNUP_SRC/components/sign";
import { useRouter } from "next/router";

export const validationPerStep: Record<number, (keyof IFormValues)[]> = {
  0: ["firstName", "lastName", "email", "password", "repeatPassword", "isTermsAccepted"],
  1: ["country", "state", "city", "birthDate", "skills"],
  2: ["linkedin", "github", "description"],
};

const geoStatesOptions: IUseGeoStates = {
  order: "ascending",
};
const geoCitiesOptions: IUseGeoCities = {
  order: "ascending",
};

export const RegisterPage = () => {
  const { formCurrentStep, setFormCurrentStep, setIsChoosingPlan } = useMultistepForm();
  const methods = useFormContext<IFormValues>();
  const router = useRouter();

  const {
    trigger,
    formState: { errors },
  } = methods;

  const isInFirstStep = formCurrentStep === 0;
  const isInLastStep = formCurrentStep === 2;

  const Country = useCountriesFactory(methods);
  const State = useStatesFactory(methods, geoStatesOptions);
  const City = useCitiesFactory(methods, geoCitiesOptions);
  const Skills = useSkillsFactory(methods);

  const formHasErrors = Object.keys(errors).length;
  if (formHasErrors) console.log("FormErrors", errors);

  const atLeastOneValidationFailed = validationPerStep[formCurrentStep].some(
    (fieldInThisStep) => fieldInThisStep in errors
  );

  const shouldGoForward = !atLeastOneValidationFailed;

  const handleActionButton = async () => {
    const allStepValidations = validationPerStep[formCurrentStep].map((field) =>
      trigger(field)
    );
    const allStepValidationsResult = await Promise.all(allStepValidations);
    const allValidationsPassed = allStepValidationsResult.every(Boolean);
    if (allValidationsPassed) {
      if (isInLastStep) return setIsChoosingPlan(true);
      return setFormCurrentStep((currentStep) => currentStep + 1);
    }
  };

  const handleGoBackButton = () => {
    if (isInFirstStep) {
      return router.push("/signin");
    }
    setFormCurrentStep((currentStep) => currentStep - 1);
  };

  return (
    <main className="flex flex-col">
      <section className="h-28 border-b border-gray-03 hidden sm:flex">
        <CenteredContainer className="flex items-center justify-between px-8 sm:px-12">
          <Stepper
            steps={[1, 2, 3]}
            currentStep={1 + formCurrentStep}
            className="hidden sm:block"
            size="regular"
          />
          <div className="max-w-xs">
            <h3 className="font-bold text-xl">Status do seu registro</h3>
            <p className="text-gray-03 text-xs w-3/4 md:block hidden">
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
              Preencha os campos para criar a sua conta e acessar a plataforma!
            </p>
            <StepperVertical
              currentStep={1 + formCurrentStep}
              className="hidden lg:block"
            />
          </aside>
          <div className="relative w-full mx-auto pt-12 lg:mx-0 mb-24 max-w-[43rem]">
            <div className="mb-3">
              {formCurrentStep === 0 && <Personal />}
              {formCurrentStep === 1 && (
                <Location
                  cityFactory={City}
                  countryFactory={Country}
                  skillsFactory={Skills}
                  stateFactory={State}
                />
              )}
              {formCurrentStep === 2 && <Professional />}
            </div>
            <Form.MultipleInRow>
              <Sign.ButtonSecondary onClick={handleGoBackButton} text="Voltar" />
              <Sign.ButtonPrimary
                onClick={handleActionButton}
                disabled={!shouldGoForward}
                text="Próximo"
              />
            </Form.MultipleInRow>
          </div>
        </CenteredContainer>
      </section>
    </main>
  );
};
