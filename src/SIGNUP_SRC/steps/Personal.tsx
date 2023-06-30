import { Input, InputErrorMessage } from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { useFormContext } from "react-hook-form";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";

export const Personal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>();

  const passwordErrors = errors.password?.message ?? errors.repeatPassword?.message;

  return (
    <>
      <MultipleInputsContainer>
        <Input
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          label="Nome:"
          placeholder="Guy"
          autoFocus
          required
        />
        <Input
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          label="Sobrenome:"
          placeholder="Hawkins"
          required
        />
      </MultipleInputsContainer>
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        type="email"
        label="E-mail:"
        placeholder="guyhawkins@mail.com"
        required
      />
      <MultipleInputsContainer>
        <Input
          {...register("password")}
          type="password"
          label="Senha:"
          placeholder="*********"
          required
        />
        <Input
          {...register("repeatPassword")}
          type="password"
          label="Confirmar senha:"
          placeholder="*********"
          required
        />
      </MultipleInputsContainer>
      <InputErrorMessage errorMessage={passwordErrors} />
    </>
  );
};
