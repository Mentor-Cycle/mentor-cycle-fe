import PersonalInformation from "./PersonalInformation";
import Profile from "./Profile";
import ContactInformation from "./ContactInformation";
import { useRef, useState, useEffect } from "react";
import useForm from "@hooks/useForm";
import { FormNavigation } from "./FormNavigation";
import { useMultiStepFormContext } from "@hooks/useMultiStepForm";
import { ActionType } from "Providers/form";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "services/apollo/mutations";
import { useRouter } from "next/router";
import { format, parse } from "date-fns";

const FORM_STEPS = [
  { id: 1, component: Profile },
  { id: 2, component: PersonalInformation },
  { id: 3, component: ContactInformation },
];

const FormSteps: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { formData } = useForm();
  const { dispatch } = useMultiStepFormContext();
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  useEffect(() => {
    const signupInfo = sessionStorage.getItem("signup_info");
    if (signupInfo) {
      const { isMentor } = JSON.parse(signupInfo);
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: { isMentor },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setIsValid(formRef.current?.checkValidity());
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      delete formData.currentStep;
      delete formData.repeatPassword;

      const date = parse(formData.birthDate || "", "dd/MM/yyyy", new Date());
      const isoDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      const response = await createUser({
        variables: {
          input: {
            ...formData,
            birthDate: isoDate,
          },
        },
      });
      if (response.data.signUpUser) {
        router.push("/login");
      }
    }
  };

  return (
    <form
      className="flex flex-col space-y-2"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="mb-10 space-y-2">
        {FORM_STEPS.map((step) => {
          if (step.id === formData.currentStep) {
            const Component = step.component;
            return <Component key={step.id} />;
          }
        })}
      </div>
      <FormNavigation isValid={isValid} />
    </form>
  );
};

export default FormSteps;
