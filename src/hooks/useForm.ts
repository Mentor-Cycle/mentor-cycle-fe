import { useMultiStepFormContext } from "@hooks/useMultiStepForm";
import { ActionType, IFormData } from "Providers/form";
import { ChangeEvent, FormEvent } from "react";

const useForm = () => {
  const { formData, dispatch } = useMultiStepFormContext();

  const updateForm = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | FormEvent<HTMLTextAreaElement>
  ) => {
    if (event.target) {
      const { name, value } = event.target as any;
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          [name]: value,
        },
      });
    }
  };

  return { formData, updateForm };
};

export default useForm;
