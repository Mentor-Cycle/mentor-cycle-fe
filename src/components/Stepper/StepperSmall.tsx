import React from "react";

interface StepperSmallProps {
  steps: number[];
  currentStep: number;
}

const StepperSmall: React.FC<StepperSmallProps> = ({
  steps = [1, 2, 3],
  currentStep,
}) => {
  const totalSteps = steps.length;

  return (
    <div className="flex justify-between w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-[60px] min-w-[60px] h-[20px] flex justify-center items-center rounded-md text-white 
            ${step <= currentStep ? "bg-primary-03" : "bg-gray-03"}`}
          >
            <span className="text-neutral-03 text-xs">{step}</span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-full h-[2px] my-auto 
              ${step < currentStep ? "bg-primary-03" : "bg-gray-03"}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepperSmall;
