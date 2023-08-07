import clsx from "clsx";
import React from "react";
import { StepperProps } from "./Stepper.types";

const Stepper: React.FC<StepperProps> = ({
  steps = [1, 2, 3],
  className,
  size = "regular",
  currentStep = 1,
}) => {
  const totalSteps = steps.length;

  const sizeClasses = {
    regular: `w-24 h-8 rounded-lg`,
    small: `w-20 h-5 text-xs m-auto rounded`,
  };

  const containerClasses = clsx(
    "flex justify-between items-center w-full max-w-2xl"
  );
  const stepClasses = clsx(
    " flex items-center justify-center relative  text-neutral-01 transition-colors duration-500 z-10"
  );
  const completedStepClasses =
    "bg-primary-03 transition-colors duration-500 bg-primary-03";

  const incompletedStepClasses = "bg-gray-03";

  const stepItem = `relative flex flex-col items-start w-full sm:w-auto sm:flex-1`;

  const stepSeparator = `content-[''] absolute w-full h-[3px] -left-[20%] transform translate-x-1/2 top-1/2`;

  const getStepClasses = (index: number): string => {
    const isCompleted = currentStep > index;

    return clsx(stepClasses, sizeClasses[size], {
      [completedStepClasses]: isCompleted,
      [incompletedStepClasses]: !isCompleted,
    });
  };

  const renderStepItem = ({
    _,
    stepIndex,
  }: {
    _: number;
    stepIndex: number;
  }) => {
    return (
      <div key={stepIndex} className={clsx(stepItem, className)}>
        <div className={getStepClasses(stepIndex)}>{stepIndex + 1}</div>
        {stepIndex < totalSteps - 1 && (
          <div
            className={clsx(stepSeparator, {
              "bg-primary-03": currentStep > stepIndex + 1,
              "bg-gray-03": currentStep <= stepIndex + 1,
            })}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className={containerClasses}>
        {steps.map((_, stepIndex) => renderStepItem({ _, stepIndex }))}
      </div>
    </>
  );
};
export default Stepper;
