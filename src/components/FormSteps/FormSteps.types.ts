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

export interface FormNavigationProps {
  isValid: boolean | undefined;
}

export interface FormDataTypes {
  formData: FormDataProps;
}
