import { Button } from "@components/Button";
import { useRef } from "react";
import {
  FormDataProps,
  FormDataTypes,
  FormNavigationProps,
  FormStepsProps,
} from "./FormSteps.types";
import PersonalInformation from "./PersonalInformation";
import Profile from "./Profile";
import ContactInformation from "./ContactInformation";
import clsx from "clsx";
import useForm from "services/apollo/hooks/useForm";

const FORM_STEPS = [
  { id: 1, component: Profile },
  { id: 2, component: PersonalInformation },
  { id: 3, component: ContactInformation },
];

const FormSteps: React.FC<FormStepsProps> = ({
  stepForm,
  setStepForm,
  isMentor,
}) => {
  const { formData, getFormData, submitForm } = useForm({
    firstName: "",
    lastName: "teste",
    email: "",
    password: "",
    state: "",
    country: "",
    city: "",
    birthDate: new Date("01/01/1990"),
    skills: ["front", "back", "design"],
    linkedin: "",
    github: "",
    description: "",
    isMentor: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const currentStep = FORM_STEPS.find((step) => step.id === stepForm);

  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStepForm((prevStep) => prevStep - 1);
  };

  const handleNextOrFinish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = formRef.current?.checkValidity();
    if (isValid) {
      const formElement = new FormData(formRef.current as HTMLFormElement);
      const formValues = Object.fromEntries(formElement.entries());
      const updateFormData = { ...formData, ...formValues, isMentor };
      getFormData(updateFormData);
      if (stepForm === 3) {
        submitForm();
      } else {
        setStepForm((prevStep) => prevStep + 1);
      }
    } else {
      alert("Digite os campos obrigatórios");
    }
  };

  const renderCurrentComponent = (
    Component: React.FC<FormDataTypes>,
    formData: FormDataProps
  ) => {
    return <Component formData={formData} />;
  };

  return (
    <form className="flex flex-col space-y-2" ref={formRef}>
      <div className="mb-10">
        {currentStep && renderCurrentComponent(currentStep.component, formData)}
      </div>
      <FormNavigation
        stepForm={stepForm}
        handleGoBack={handleGoBack}
        handleNextOrFinish={handleNextOrFinish}
      />
    </form>
  );
};

const FormNavigation = ({
  stepForm,
  handleGoBack,
  handleNextOrFinish,
}: FormNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex sm:flex-row justify-center items-center gap-4 mb-10 sm:justify-end">
      <Button
        className={clsx(
          stepForm === 1 ? "hidden" : "",
          "order-last sm:order-first max-w-[328px]"
        )}
        variant="secondary"
        onClick={handleGoBack}
      >
        Voltar
      </Button>
      <Button
        className={clsx("max-w-[328px]", "order-first sm:order-last")}
        onClick={handleNextOrFinish}
      >
        {stepForm === 3 ? "Finalizar" : "Próximo"}
      </Button>
    </div>
  );
};

export default FormSteps;
