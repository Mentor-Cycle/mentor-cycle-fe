import Input from "@components/Input";
import clsx from "clsx";
import { ChangeEvent, useContext, useState } from "react";
import { ActionType, MultiStepFormContext } from "Providers/form";
import { createStringRequirements } from "utils/regex";
import useForm from "@hooks/useForm";

const Profile = () => {
  const { updateForm, formData } = useForm();
  const { firstName, lastName, email, password, repeatPassword } = formData;
  const passwordRequirements = createStringRequirements({
    minLength: 6,
    includeNumber: true,
    includeLowercase: false,
    includeUppercase: false,
    includeSpecial: false,
  });

  return (
    <>
      <div className="sm:flex gap-4">
        <Input
          label="Nome"
          name="firstName"
          placeholder="Guy"
          onBlur={updateForm}
          defaultValue={firstName}
          required
        />
        <Input
          label="Sobrenome"
          name="lastName"
          placeholder="Hawkins"
          onBlur={updateForm}
          defaultValue={lastName}
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
            onBlur={updateForm}
            defaultValue={password}
            pattern={passwordRequirements.toString().slice(1, -1)}
            required
          />
          <p
            className={clsx(
              `block text-xs text-secondary-01 italic  transition-all duration-700`
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
            onBlur={updateForm}
            defaultValue={repeatPassword}
            pattern={formData.password}
            required
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
