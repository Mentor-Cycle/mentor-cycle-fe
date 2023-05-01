import PersonalInformation from "./PersonalInformation";
import Profile from "./Profile";
import useForm from "@hooks/useForm";
import clsx from "clsx";
import ContactInformation from "./ContactInformation";
import { useRef, useState, useEffect } from "react";
import { ActionType } from "providers/form";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "services/apollo/mutations";
import { useRouter } from "next/router";
import { format, parse } from "date-fns";
import Button from "@components/Button";
import { toast } from "react-toastify";

const FORM_STEPS = [
  { id: 1, component: Profile },
  { id: 2, component: PersonalInformation },
  { id: 3, component: ContactInformation },
];

const FormSteps: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { formData, currentStep } = useForm();
  const { dispatch, updateCurrentStep } = useForm();
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
  }, [formData, currentStep]);

  const handleSubmit = async () => {
    if (isValid) {
      setIsSubmitting(true);
      delete formData.repeatPassword;
      const date = parse(formData.birthDate || "", "dd/MM/yyyy", new Date());
      const isoDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      try {
        const response = await toast.promise(
          createUser({
            variables: {
              input: {
                ...formData,
                birthDate: isoDate,
              },
            },
          }),
          {
            pending: "Aguarde um momento...",
            success: `Usuário ${
              formData.firstName ? formData.firstName : "MentorCycle"
            } cadastrado com sucesso!`,
          }
        );
        if (response.data.signUpUser) {
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col space-y-2"
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-10 space-y-2">
        {FORM_STEPS.map(({ id, component }) => {
          if (id === currentStep) {
            const Component = component;
            return <Component key={id} />;
          }
        })}
      </div>
      <div className="flex flex-col sm:flex sm:flex-row justify-center items-center gap-4 mb-10 sm:justify-end">
        <Button
          className={clsx(
            currentStep === 1 ? "hidden" : "",
            "order-last sm:order-first max-w-[328px]"
          )}
          variant="secondary"
          onClick={() => updateCurrentStep((currentStep || 2) - 1)}
        >
          Voltar
        </Button>
        <Button
          className={clsx("max-w-[328px]", "order-first sm:order-last")}
          isLoading={isSubmitting}
          onClick={() => {
            if (currentStep === 3) {
              handleSubmit();
            } else {
              updateCurrentStep((currentStep || 2) + 1);
            }
          }}
          disabled={!isValid || isSubmitting}
        >
          {currentStep === 3 ? "Finalizar" : "Próximo"}
        </Button>
      </div>
    </form>
  );
};

export default FormSteps;
