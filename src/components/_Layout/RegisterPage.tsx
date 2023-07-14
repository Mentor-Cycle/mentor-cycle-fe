/* eslint-disable react-hooks/exhaustive-deps */
import { CenteredContainer } from "@components/CenteredContainer";
import Stepper from "@components/Stepper/Stepper";
import StepperVertical from "@components/StepperVertical";
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import { Personal } from "SIGNUP_SRC/steps/Personal";
import { IFormValues } from "SIGNUP_SRC/types";
import { PathValue, SubmitHandler, useFormContext } from "react-hook-form";
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
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "services/apollo/mutations";
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
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  const {
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const isMentor = watch("isMentor");

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
    if (isInFirstStep) {
      return setIsChoosingPlan(true);
    }
    setFormCurrentStep((currentStep) => currentStep - 1);
  };

  const submitHandler: SubmitHandler<IFormValues> = async (formData) => {
    const { repeatPassword, isTermsAccepted, ...createUserPayload } = formData;

    try {
      const response = await toast.promise(
        createUser({
          variables: {
            input: createUserPayload,
          },
        }),
        {
          pending: "Aguarde um momento...",
          success: `Usuário ${
            formData.firstName ? formData.firstName : "MentorCycle"
          } cadastrado com sucesso!`,
        }
      );
      if (response.data.signUpUser) {
        localStorage.removeItem("form-data");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getErrorMessage = (error: any) => {
    const errorMessages: Record<string, string> = {
      description: "A descrição precisa ter no mínimo 2 caracteres",
      email: "Este email já possui cadastro",
    };

    for (const key in errorMessages) {
      if (error.message.includes(key)) {
        return errorMessages[key];
      }
    }

    return error instanceof Error
      ? error.message
      : "Não foi possivel concluir o cadastro, tente novamente mais tarde";
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
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="relative form w-full mx-auto pt-12 lg:mx-0 mb-24 max-w-[43rem]"
          >
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
              {isInLastStep && (
                <Sign.ButtonPrimary
                  type="submit"
                  disabled={!shouldGoForward || isSubmitting}
                  text="Enviar"
                />
              )}
              {!isInLastStep && (
                <Sign.ButtonPrimary
                  onClick={() => !isInLastStep && handleActionButton()}
                  disabled={!shouldGoForward}
                  text="Próximo"
                />
              )}
            </Form.MultipleInRow>
          </form>
        </CenteredContainer>
      </section>
    </main>
  );
};
