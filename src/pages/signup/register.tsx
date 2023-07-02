/* eslint-disable react-hooks/exhaustive-deps */
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import Providers from "providers/signup/register";
import { PlanPage } from "@components/_Layout/PlanPage";
import { RegisterPage } from "@components/_Layout/RegisterPage";

const RegisterPageComponent = () => {
  const { isChoosingPlan } = useMultistepForm();

  return isChoosingPlan ? <PlanPage /> : <RegisterPage />;
};

export default function Register() {
  return (
    <Providers>
      <RegisterPageComponent />
    </Providers>
  );
}
