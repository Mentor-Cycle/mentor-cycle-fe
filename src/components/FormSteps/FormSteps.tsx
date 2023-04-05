import { useRef, useState, useEffect } from "react";
import { Button } from "@components/Button";
import { ActionType } from "../../Providers/form/MultiStepFormContext";
import { FormNavigationProps } from "./FormSteps.types";
import { useMultiStepFormContext } from "@hooks/useForm";
import Profile from "./Profile";
import ContactInformation from "./ContactInformation";
import PersonalInformation from "./PersonalInformation";
import UserForm from "services/apollo/hooks/UserForm";
import clsx from "clsx";

const FORM_STEPS = [
  { id: 1, component: Profile },
  { id: 2, component: PersonalInformation },
  { id: 3, component: ContactInformation },
];

const FormSteps = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { currentStep, dispatch, formData } = useMultiStepFormContext();
  const { submitForm } = UserForm();
  const [isValid, setIsValid] = useState<boolean | undefined>(false);

  useEffect(() => {
    const signupInfo = sessionStorage.getItem("signup_info");
    if (signupInfo) {
      const { isMentor } = JSON.parse(signupInfo);
      dispatch({
        type: ActionType.UPDATE_GLOBAL,
        payload: { formData: { ...formData, isMentor } },
      });
    }
  }, []);

  useEffect(() => {
    setIsValid(formRef.current?.checkValidity());
  }, [formData, currentStep]);

  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 1) {
      dispatch({ type: ActionType.PREV_STEP });
    }
  };
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValid) {
      dispatch({ type: ActionType.NEXT_STEP });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      submitForm();
    }
  };
  return (
    <form
      className="flex flex-col space-y-2"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="mb-10 space-y-2">
        {FORM_STEPS.map((step) => {
          if (step.id === currentStep) {
            const Component = step.component;
            return <Component key={step.id} />;
          }
        })}
      </div>
      <FormNavigation
        handleGoBack={handleGoBack}
        nextStep={nextStep}
        isValid={isValid}
      />
    </form>
  );
};

const FormNavigation = ({
  handleGoBack,
  nextStep,
  isValid,
}: FormNavigationProps) => {
  const { currentStep } = useMultiStepFormContext();

  return (
    <div className="flex flex-col sm:flex sm:flex-row justify-center items-center gap-4 mb-10 sm:justify-end">
      <Button
        className={clsx(
          currentStep === 1 ? "hidden" : "",
          "order-last sm:order-first max-w-[328px]"
        )}
        variant="secondary"
        onClick={handleGoBack}
      >
        Voltar
      </Button>
      {currentStep === 3 ? (
        <Button
          className={clsx("max-w-[328px]", "order-first sm:order-last")}
          type="submit"
          disabled={!isValid}
        >
          Finalizar
        </Button>
      ) : (
        <Button
          className={clsx("max-w-[328px]", "order-first sm:order-last")}
          onClick={nextStep}
          disabled={!isValid}
        >
          Próximo
        </Button>
      )}
    </div>
  );
};

export default FormSteps;
