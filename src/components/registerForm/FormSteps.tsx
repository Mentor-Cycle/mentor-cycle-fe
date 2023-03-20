import { Button } from "@components/Button";
import { useRef, useState } from "react";
import {
  FormDataProps,
  FormDataTypes,
  FormNavigationProps,
  FormStepsProps,
} from "./FormSteps.types";
import PersonalInformation from "./PersonalInformation";
import Profile from "./Profile";
import ContactInformation from "./ContactInformation";

const FORM_STEPS = [
  { id: 1, component: Profile },
  { id: 2, component: PersonalInformation },
  { id: 3, component: ContactInformation },
];

const FormNavigation = ({
  stepForm,
  handleGoBack,
  handleNextOrFinish,
}: FormNavigationProps) => {
  return (
    <div className="flex gap-4 mb-10 justify-end">
      <Button
        className={stepForm === 1 ? "hidden" : ""}
        variant="secondary"
        onClick={handleGoBack}
      >
        Voltar
      </Button>
      <Button className="max-w-[328px]" onClick={handleNextOrFinish}>
        {stepForm === 3 ? "Finalizar" : "Próximo"}
      </Button>
    </div>
  );
};

const FormSteps: React.FC<FormStepsProps> = ({
  stepForm,
  setStepForm,
  isMentor,
}) => {
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    repeatPassword: "",
    password: "",
    state: "",
    country: "",
    city: "",
    birthday: "",
    skills: "",
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

  const handleNextOrFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = formRef.current?.checkValidity();
    if (isValid) {
      const formElement = new FormData(formRef.current as HTMLFormElement);
      const formValues = Object.fromEntries(formElement.entries());
      const updateFormData = { ...formData, ...formValues, isMentor };
      setFormData(updateFormData);
      if (stepForm === 3) {
        // Enviar dados do formulário aqui
        console.log(updateFormData);
        alert("cadastro realizado com sucesso!");
      } else {
        setStepForm((prevStep) => prevStep + 1);
      }
    }
  };

  const renderCurrentComponent = (
    Component: React.FC<FormDataTypes>,
    formData: FormDataProps
  ) => {
    return <Component formData={formData} />;
  };

  return (
    <form className="flex flex-col gap-2 mb-20" ref={formRef}>
      {currentStep && renderCurrentComponent(currentStep.component, formData)}
      <FormNavigation
        stepForm={stepForm}
        handleGoBack={handleGoBack}
        handleNextOrFinish={handleNextOrFinish}
      />
    </form>
  );
};

export default FormSteps;
