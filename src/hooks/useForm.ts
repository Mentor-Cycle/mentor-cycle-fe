import { ActionType, MultiStepFormContext } from "Providers/form";
import { ChangeEvent, FormEvent, useContext } from "react";

const useForm = () => {
  const { formData, dispatch, currentStep } = useContext(MultiStepFormContext);

  const updateForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target) {
      const { name, value } = event.target;
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          [name]: value,
        },
      });
    }
  };

  const updateCurrentStep = (step: number) => {
    dispatch({
      type: ActionType.UPDATE_CURRENT_STEP,
      payload: step,
    });
  };

  return { formData, updateForm, currentStep, updateCurrentStep, dispatch };
};

export default useForm;
