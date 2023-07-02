import PersonalInformation from "./PersonalInformation";
import Profile from "./Profile";
import useForm from "@hooks/useForm";
import clsx from "clsx";
import ContactInformation from "./ContactInformation";
import { useRef, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "services/apollo/mutations";
import { useRouter } from "next/router";
import { format, parse } from "date-fns";
import Button from "@components/Button";
import { toast } from "react-toastify";
import { isValidDate } from "@components/Date/dateHelpers";

const FORM_STEPS = [
  { id: 1, component: Profile },
  { id: 2, component: PersonalInformation },
  { id: 3, component: ContactInformation },
];

const FormSteps: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { formData, currentStep, updateCurrentStep, getIsAllowedToGoNext } = useForm();
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  useEffect(() => {
    setIsValid(formRef.current?.checkValidity());
  }, [formData, currentStep]);

  const getIsoDate = (date: string | null) => {
    if (date && date !== "") {
      const parsedDate = parse(date, "dd/MM/yyyy", new Date());
      return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
    }
    return null;
  };

  const getErrorMessage = (error: any) => {
    const errorMessages: Record<string, string> = {
      description: "A descrição precisa ter no mínimo 2 caracteres",
      email: "Este email já possui cadastro",
    };

    for (const key in errorMessages) {
      if (error.message.includes(key)) {
        return errorMessages[key];
      }
    }

    return error instanceof Error
      ? error.message
      : "Não foi possivel concluir o cadastro, tente novamente mais tarde";
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    const isValidBirthDate =
      formData.birthDate === null ||
      isValidDate(formData.birthDate) ||
      formData.birthDate === "";

    if (!isValidBirthDate) {
      toast.error(`Data de nascimento inválida.`);
      return;
    }

    setIsSubmitting(true);
    delete formData.repeatPassword;
    const isoDate = getIsoDate(formData.birthDate);
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
        localStorage.removeItem("form-data");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
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
          className={clsx(currentStep === 1 ? "hidden" : "", "order-last sm:order-first")}
          variant="secondary"
          onClick={() => updateCurrentStep((currentStep || 2) - 1)}
        >
          Voltar
        </Button>
        <Button
          tabIndex={2}
          className={clsx(currentStep === 1 ? "" : "hidden", "order-last sm:order-first")}
          variant="secondary"
          onClick={() => router.push("/signup/register")}
        >
          Voltar
        </Button>
        <Button
          tabIndex={0}
          className={clsx("", "order-first sm:order-last")}
          isLoading={isSubmitting}
          onClick={() => {
            if (currentStep === 3) {
              handleSubmit();
            } else {
              updateCurrentStep((currentStep || 2) + 1);
            }
          }}
          disabled={
            !isValid || isSubmitting || (currentStep === 1 && !getIsAllowedToGoNext())
          }
        >
          {currentStep === 3 ? "Finalizar" : "Próximo"}
        </Button>
      </div>
    </form>
  );
};

export default FormSteps;
