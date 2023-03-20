import Input from "@components/Input";
import { useRef } from "react";
import { FormDataTypes } from "./FormSteps.types";

const Profile = ({ formData }: FormDataTypes) => {
  const { name, email, repeatPassword, password } = formData;

  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const validatePasswords = () => {
    if (
      passwordRef.current &&
      repeatPasswordRef.current &&
      repeatPasswordRef.current.value !== ""
    ) {
      if (repeatPasswordRef.current.value !== passwordRef.current.value) {
        repeatPasswordRef.current.setCustomValidity(
          "As senhas não correspondem."
        );
      } else {
        repeatPasswordRef.current.setCustomValidity("");
      }

      repeatPasswordRef.current.reportValidity();
    }
  };
  return (
    <>
      <Input
        label="Nome"
        name="name"
        placeholder="usuario1"
        defaultValue={name}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="user1@gmail.com"
        defaultValue={email}
        required
      />
      <div className="flex gap-4">
        <Input
          label="Senha"
          name="password"
          placeholder="**********************"
          type="password"
          defaultValue={password}
          required
          onChange={validatePasswords}
          onBlur={validatePasswords}
          ref={passwordRef}
          pattern={"^.{7,}$"}
        />
        <Input
          label="Confirmar senha"
          name="repeatPassword"
          placeholder="**********************"
          type="password"
          defaultValue={repeatPassword}
          required
          onChange={validatePasswords}
          onBlur={validatePasswords}
          ref={repeatPasswordRef}
          pattern={"^.{7,}$"}
        />
      </div>
    </>
  );
};

export default Profile;
