import Input from "@components/Input";
import clsx from "clsx";
import { ChangeEvent, useContext, useState } from "react";
import { ActionType, MultiStepFormContext } from "Providers/form";
import { createStringRequirements } from "utils/regex";

const Profile = () => {
  const { formData, dispatch } = useContext(MultiStepFormContext);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [birthDateValid, setBirthDateValid] = useState(false);

  const { firstName, lastName, email, password, repeatPassword } = formData;

  const passwordRequirements = createStringRequirements({
    minLength: 6,
    includeNumber: true,
    includeLowercase: false,
    includeUppercase: false,
    includeSpecial: false,
  });

  const handleBirthDateValidChange = (valid: boolean) => {
    setBirthDateValid(valid);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "birthDate" && !birthDateValid) {
      return;
    }
    dispatch({ type: ActionType.UPDATE_FORM_DATA, payload: { [name]: value } });
  };

  return (
    <>
      <div className="sm:flex gap-4">
        <Input
          label="Nome"
          name="firstName"
          placeholder="Guy"
          onBlur={handleInputChange}
          defaultValue={firstName}
          required
        />
        <Input
          label="Sobrenome"
          name="lastName"
          placeholder="Hawkins"
          onBlur={handleInputChange}
          defaultValue={lastName}
          required
        />
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="user1@gmail.com"
        onBlur={handleInputChange}
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
            onBlur={handleInputChange}
            onValidChange={handleBirthDateValidChange}
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
            onBlur={handleInputChange}
            defaultValue={repeatPassword}
            pattern={formData.password}
            required
          />
          {passwordError && (
            <p className="text-danger-01 text-xs italic mt-4">
              {passwordError}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
