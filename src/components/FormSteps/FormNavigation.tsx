import clsx from "clsx";
import { FormNavigationProps } from "./FormSteps.types";
import { Button } from "@components/Button";
import useForm from "@hooks/useForm";
import { useMultiStepFormContext } from "@hooks/useMultiStepForm";
import { ActionType } from "Providers/form";

export const FormNavigation = ({ isValid }: FormNavigationProps) => {
  const { formData } = useForm();
  const { dispatch } = useMultiStepFormContext();
  const { currentStep } = formData;
  const updateCurrentStep = (step: number) => {
    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: { currentStep: step },
    });
  };

  return (
    <div className="flex flex-col sm:flex sm:flex-row justify-center items-center gap-4 mb-10 sm:justify-end">
      <Button
        className={clsx(
          currentStep === 1 ? "hidden" : "",
          "order-last sm:order-first max-w-[328px]"
        )}
        variant="secondary"
        onClick={() => updateCurrentStep(currentStep - 1)}
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
          onClick={() => updateCurrentStep(currentStep + 1)}
          disabled={!isValid}
        >
          Próximo
        </Button>
      )}
    </div>
  );
};
