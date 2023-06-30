import { IFormValues } from "SIGNUP_SRC/types";
import { useFormContext } from "react-hook-form";
import { Input } from "SIGNUP_SRC/components/Input";
import { Form } from "SIGNUP_SRC/components/Form";

export const Personal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>();

  const passwordErrors = errors.password?.message ?? errors.repeatPassword?.message;

  return (
    <>
      <Form.MultipleInRow>
        <Input.String
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          label="Nome:"
          placeholder="Guy"
          autoFocus
          required
        />
        <Input.String
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          label="Sobrenome:"
          placeholder="Hawkins"
          required
        />
      </Form.MultipleInRow>
      <Input.String
        {...register("email")}
        errorMessage={errors.email?.message}
        type="email"
        label="E-mail:"
        placeholder="guyhawkins@mail.com"
        required
      />
      <Form.MultipleInRow>
        <Input.String
          {...register("password")}
          type="password"
          label="Senha:"
          placeholder="*********"
          required
        />
        <Input.String
          {...register("repeatPassword")}
          type="password"
          label="Confirmar senha:"
          placeholder="*********"
          required
        />
      </Form.MultipleInRow>
      <Input.Error errorMessage={passwordErrors} />
    </>
  );
};
