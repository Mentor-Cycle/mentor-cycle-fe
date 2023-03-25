import { useMutation } from "@apollo/client";
import { FormDataProps } from "@components/FormSteps";
import { useRouter } from "next/router";
import { useState } from "react";
import { CREATE_USER } from "../mutations";

const useForm = (initialData: FormDataProps) => {
  const [formData, setFormData] = useState<FormDataProps>(initialData);
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  const getFormData = (newData: Partial<FormDataProps>) => {
    setFormData({ ...formData, ...newData });
  };

  const submitForm = async () => {
    try {
      await createUser({
        variables: {
          input: formData,
        },
      });
      alert("Cadastro realizado com sucesso!");
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return { formData, getFormData, submitForm };
};

export default useForm;
