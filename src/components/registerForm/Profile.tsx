import Input from "@components/Input";
import { useRef } from "react";
import { FormDataTypes } from "./FormSteps.types";

const Profile = ({ formData }: FormDataTypes) => {
  const { firstName, email, password } = formData;

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
        name="firstName"
        placeholder="usuario1"
        defaultValue={firstName}
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
      <div className="sm:flex gap-4">
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
          // pattern={"^.{7,}$"}
        />
        <Input
          label="Confirmar senha"
          name=""
          placeholder="**********************"
          type="password"
          // defaultValue={}
          required
          onChange={validatePasswords}
          onBlur={validatePasswords}
          ref={repeatPasswordRef}
          // pattern={"^.{7,}$"}
        />
      </div>
    </>
  );
};

export default Profile;
