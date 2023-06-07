/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Input from "@components/Input";
import clsx from "clsx";
import { createStringRequirements } from "utils/regex";
import useForm from "@hooks/useForm";

const Profile = () => {
  const { updateForm, formData, setIsAllowedToGoNext } = useForm();
  const { firstName, lastName, email, password, repeatPassword } = formData;
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  const passwordRequirements = createStringRequirements({
    minLength: 6,
    includeNumber: true,
    includeLowercase: true,
    includeUppercase: false,
    includeSpecial: false,
  });

  const handlePasswordChange = (event: any) => {
    updateForm(event);
    const doPasswordsMatch = formData.password === event.target.value;
    setPasswordsDoNotMatch(!doPasswordsMatch);
    setIsAllowedToGoNext(doPasswordsMatch);
  };

  useEffect(() => {
    if (password === repeatPassword) {
      setIsAllowedToGoNext(true);
      setPasswordsDoNotMatch(false);
    } else {
      setIsAllowedToGoNext(false);
    }
  }, [repeatPassword]);

  return (
    <>
      <div className="sm:flex gap-4">
        <Input
          label="Nome"
          name="firstName"
          placeholder="Guy"
          onBlur={updateForm}
          defaultValue={firstName}
          pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
          required
        />
        <Input
          label="Sobrenome"
          name="lastName"
          placeholder="Hawkins"
          onBlur={updateForm}
          defaultValue={lastName}
          pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
          required
        />
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="user1@gmail.com"
        onBlur={updateForm}
        defaultValue={email}
        required
      />
      <div className="sm:flex gap-4">
        <div className="w-full">
          <Input
            title="Senha: min 6 caracteres incluindo"
            label="Senha"
            name="password"
            placeholder="**********************"
            type="password"
            onBlur={handlePasswordChange}
            defaultValue={password}
            pattern={passwordRequirements.toString().slice(1, -1)}
            required
          />
          <p
            className={clsx(
              `block text-xs text-secondary-01 italic transition-all duration-700`
            )}
          >
            Senha: mínimo 6 caracteres números e letras.
          </p>
        </div>
        <div className="w-full">
          <Input
            label="Confirmar senha"
            name="repeatPassword"
            placeholder="**********************"
            type="password"
            value={repeatPassword}
            onChange={handlePasswordChange}
            defaultValue={repeatPassword}
            pattern={formData.password}
            required
          />
          {passwordsDoNotMatch && (
            <p className="text-danger-01 text-sm">As senhas não coincidem</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
