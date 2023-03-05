import clsx from "clsx";
import React from "react";
import { StepperProps } from "./Stepper.types";

export const Stepper: React.FC<StepperProps> = ({
  steps = [1, 2, 3],
  currentStep = 1,
}) => {
  const totalSteps = steps.length;

  const containerClasses = clsx(
    "flex justify-between items-center mb-4 w-full max-w-2xl"
  );
  const stepClasses = clsx(
    "w-24 h-8 flex items-center justify-center relative rounded-lg text-neutral-01 transition-colors duration-500 z-10"
  );
  const completedStepClasses = "step-item-completed bg-primary-03";

  const incompletedStepClasses = "bg-gray-03";

  const stepItem = `relative flex flex-col items-center w-full sm:w-auto sm:flex-1`;

  const stepSeparator = `content-[''] absolute w-full h-[3px] -left-[20%] transform translate-x-1/2 top-1/2`;

  const getStepClasses = (index: number): string => {
    const isCompleted = currentStep > index;
    return clsx(stepClasses, {
      [completedStepClasses]: isCompleted,
      [incompletedStepClasses]: !isCompleted,
    });
  };

  const renderStepItem = (step: number, index: number) => {
    return (
      <div key={index} className={stepItem}>
        <div className={getStepClasses(index)}>{index + 1}</div>
        {index < totalSteps - 1 && (
          <div
            className={clsx(stepSeparator, {
              "bg-primary-03": currentStep > index + 1,
              "bg-gray-03": currentStep <= index + 1,
            })}
          />
        )}
      </div>
    );
  };
  return (
    <>
      <div className={containerClasses}>{steps.map(renderStepItem)}</div>
    </>
  );
};
