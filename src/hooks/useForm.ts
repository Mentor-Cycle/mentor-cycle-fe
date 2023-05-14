import { ActionType, MultiStepFormContext } from "providers/form";
import { ChangeEvent, FormEvent, useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const useForm = () => {
  const { formData, dispatch, currentStep } = useContext(MultiStepFormContext);
  const [formStorage, setFormStorage] = useLocalStorage("form-data", formData);
  const updateForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event) {
      const { name, value } = event.target;
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          [name]: value,
        },
      });
      setFormStorage({
        ...formStorage,
        [name]: value,
      });
    }
  };

  const getCurrentStep = () => {
    return currentStep;
  };

  const updateFormTextarea = (event: FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    const { name, value } = target;
    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: {
        ...formData,
        [name]: value,
      },
    });
    setFormStorage({
      ...formStorage,
      [name]: value,
    });
  };

  const updateCurrentStep = (step: number) => {
    dispatch({
      type: ActionType.UPDATE_CURRENT_STEP,
      payload: step,
    });
  };

  const updateBirthday = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const { name, value } = event.target;

      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          [name]: value,
        },
      });
      setFormStorage({
        ...formStorage,
        [name]: value,
      });
    }
  };

  return {
    formData,
    updateForm,
    currentStep,
    updateCurrentStep,
    dispatch,
    updateFormTextarea,
    getCurrentStep,
    updateBirthday,
  };
};

export default useForm;
