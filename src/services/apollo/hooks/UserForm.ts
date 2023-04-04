import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_USER } from "../mutations";
import { useMultiStepFormContext } from "@hooks/useForm";

const UserForm = () => {
  const { formData } = useMultiStepFormContext();
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  const submitForm = async () => {
    try {
      await createUser({
        variables: {
          input: formData,
        },
      });
      alert("Cadastro realizado com sucesso!");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return { formData, submitForm };
};

export default UserForm;
