import clsx from "clsx";
import { StepperVerticalProps } from "./StepperVertical.types";

const StepperVertical: React.FC<StepperVerticalProps> = ({
  steps = ["Perfil", "Dados pessoais", "Descrição de trabalho"],
  className,
  currentStep,
  setCurrentStep,
  clickable = false,
}) => {
  const ACTIVE_CLASS = `
    border-l-4 border-primary-03 
    text-secondary-03 text-2xl font-semibold
    dark:text-neutral-01 
    transition duration-700
    bg-transparent`;

  const INACTIVE_CLASS = `
    border-l border-neutral-05 
    text-gray-03 
    dark:text-neutral-05`;

  const isActive = (index: number) => currentStep === index + 1;

  return (
    <div className={clsx("w-full", className)}>
      {steps.map((step, index) => {
        return clickable && setCurrentStep ? (
          <div
            onClick={() => setCurrentStep(index + 1)}
            key={index}
            className={clsx(
              "p-6 cursor-pointer max-w-[200px] opacity-80 hover:opacity-100",
              isActive(index) ? ACTIVE_CLASS : INACTIVE_CLASS
            )}
          >
            {step}
          </div>
        ) : (
          <div
            key={index}
            className={clsx(
              "p-6 max-w-[200px] ",
              isActive(index) ? ACTIVE_CLASS : INACTIVE_CLASS
            )}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
};

export default StepperVertical;
