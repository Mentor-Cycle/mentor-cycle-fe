import { IFormValues } from "SIGNUP_SRC/types";
import { useFormContext } from "react-hook-form";
import { Input } from "SIGNUP_SRC/components/Input";
import { Form } from "SIGNUP_SRC/components/Form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dispatch, SetStateAction, useState } from "react";
import { IconsProps } from "SIGNUP_SRC/components/Input/InputStringAction";

export const Personal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>();
  const [seeingPassword, setSeeingPassword] = useState(false);
  const [seeingRepeatPassword, setSeeingRepeatPassword] = useState(false);

  const passwordErrors = errors.password?.message ?? errors.repeatPassword?.message;

  const handlePasswordAction = (setState: Dispatch<SetStateAction<boolean>>) => () => {
    setState((status) => !status);
  };

  const passwordType = seeingPassword ? "text" : "password";
  const repeatPasswordType = seeingRepeatPassword ? "text" : "password";
  const seePasswordIcons = [AiOutlineEye, AiOutlineEyeInvisible] as IconsProps;

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
        <Input.StringAction
          {...register("password")}
          label="Senha:"
          placeholder="*********"
          type={passwordType}
          icons={seePasswordIcons}
          active={seeingPassword}
          onAction={handlePasswordAction(setSeeingPassword)}
          required
        />
        <Input.StringAction
          {...register("repeatPassword")}
          label="Confirmar senha:"
          placeholder="*********"
          type={repeatPasswordType}
          icons={seePasswordIcons}
          active={seeingRepeatPassword}
          onAction={handlePasswordAction(setSeeingRepeatPassword)}
          required
        />
      </Form.MultipleInRow>
      <Input.Error errorMessage={passwordErrors} />
    </>
  );
};
