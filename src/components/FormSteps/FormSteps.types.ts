export interface FormDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  state: string;
  city: string;
  birthDate: Date;
  country: string;
  skills: string[];
  linkedin: string;
  github: string;
  description: string;
  isMentor: boolean;
}

export interface FormStep {
  id: number;
  component: JSX.Element;
}

export interface FormStepsProps {
  stepForm: number;
  setStepForm: React.Dispatch<React.SetStateAction<number>>;
  isMentor: boolean;
}

export interface FormNavigationProps {
  stepForm: number;
  handleGoBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleNextOrFinish: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface FormDataTypes {
  formData: FormDataProps;
}
