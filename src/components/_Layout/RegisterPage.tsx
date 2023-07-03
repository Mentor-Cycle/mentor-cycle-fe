/* eslint-disable react-hooks/exhaustive-deps */
import { CenteredContainer } from "@components/CenteredContainer";
import Stepper from "@components/Stepper/Stepper";
import StepperVertical from "@components/StepperVertical";
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import { Personal } from "SIGNUP_SRC/steps/Personal";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, PathValue, SubmitHandler, useFormContext } from "react-hook-form";
import { Location } from "SIGNUP_SRC/steps/Location";
import { Professional } from "SIGNUP_SRC/steps/Professional";
import { useCountriesFactory } from "SIGNUP_SRC/steps/factories/useCountriesFactory";
import { useStatesFactory } from "SIGNUP_SRC/steps/factories/useStatesFactory";
import { useCitiesFactory } from "SIGNUP_SRC/steps/factories/useCitiesFactory";
import { useSkillsFactory } from "SIGNUP_SRC/steps/factories/useSkillsFactory";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";
import { IUseGeoCities } from "SIGNUP_SRC/hooks/useGeoCities/types";
import { Form } from "SIGNUP_SRC/components/Form";
import { TextToggle } from "SIGNUP_SRC/components/Form/TextToggle";

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

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    control,
    watch,
  } = methods;

  const isMentor = watch("isMentor");
  const isMentorDatatype = isMentor ? "mentor" : "mentorado";

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
    if (allValidationsPassed) return setFormCurrentStep((currentStep) => currentStep + 1);
  };

  const handleGoBackButton = () => {
    console.log("Clickou no botão de voltar");

    if (isInFirstStep) {
      return setIsChoosingPlan(true);
    }
    setFormCurrentStep((currentStep) => currentStep - 1);
  };

  const submitHandler: SubmitHandler<IFormValues> = (formData) => {
    console.log("submitHandler");
    console.log(formData);
  };

  const handleIsMentorToggle =
    (onChangeHookForm: (...args: any[]) => void) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget;
      const isMentor = name === "mentor";
      onChangeHookForm(isMentor as PathValue<IFormValues, "isMentor">);
    };

  return (
    <main className="flex flex-col">
      <section className="h-28 border-b border-gray-02 hidden sm:flex">
        <CenteredContainer className="flex items-center justify-between px-8 sm:px-12">
          <Stepper
            steps={[1, 2, 3]}
            currentStep={1 + formCurrentStep}
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
              Preencha os campos para criar a sua conta e acessar a plataforma!
            </p>
            <StepperVertical
              currentStep={1 + formCurrentStep}
              className="hidden lg:block"
            />
          </aside>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="relative w-full m-auto pt-12 lg:m-0 mb-24 max-w-[43rem]"
          >
            <Controller
              name="isMentor"
              control={control}
              render={({ field: { value, ...field } }) => (
                <TextToggle.Root>
                  <TextToggle.Label
                    className="bg-secondary-02 border border-gray-05 whitespace-nowrap"
                    color="#CECECE"
                    text="Deseja participar como"
                  />
                  <TextToggle.OptionsContainer
                    className="bg-secondary-04 border border-gray-05 flex-col xs:flex-row rounded-xl xs:rounded-full"
                    optionsColor="#CECECE"
                    optionsHoverBackgroundColor="#343434"
                    optionSelected="#3E3E3E"
                  >
                    <TextToggle.Option
                      {...field}
                      name="mentor"
                      option="Mentor"
                      onClick={handleIsMentorToggle(field.onChange)}
                      optionSelected={isMentorDatatype}
                      className="xs:rounded-full rounded-[10px]"
                    />
                    <TextToggle.Option
                      {...field}
                      name="mentorado"
                      option="Mentorado"
                      onClick={handleIsMentorToggle(field.onChange)}
                      optionSelected={isMentorDatatype}
                      className="xs:rounded-full rounded-[10px]"
                    />
                  </TextToggle.OptionsContainer>
                </TextToggle.Root>
              )}
            />
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
              <Form.Button
                className="sm:order-none order-1 focus:outline-gray-03 bg-secondary-01 border border-gray-03"
                onClick={handleGoBackButton}
                tabIndex={30}
              >
                Voltar
              </Form.Button>

              {isInLastStep && (
                <Form.Button
                  type="submit"
                  className="focus:outline-primary-02 bg-primary-02 disabled:bg-primary-04"
                  disabled={!shouldGoForward}
                >
                  Enviar
                </Form.Button>
              )}
              {!isInLastStep && (
                <Form.Button
                  className="focus:outline-primary-02 bg-primary-02 disabled:bg-primary-04"
                  onClick={() => !isInLastStep && handleActionButton()}
                  disabled={!shouldGoForward}
                  tabIndex={25}
                >
                  Próximo
                </Form.Button>
              )}
            </Form.MultipleInRow>
          </form>
        </CenteredContainer>
      </section>
    </main>
  );
};
