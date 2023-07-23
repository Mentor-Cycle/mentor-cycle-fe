import { useMutation } from "@apollo/client";
import Button from "@components/Button";
import { InputElement } from "@components/Input";
import clsx from "clsx";

import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { toast } from "react-toastify";
import { RESET_NEW_PASSWORD } from "services/apollo/mutations";
import { createStringRequirements } from "utils/regex";

const ChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [resetUserPassword, { loading }] = useMutation(RESET_NEW_PASSWORD);
  const [sucessChangePassword, setsucessChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [arePasswordsEqual, setArePasswordsEqual] = useState(true);

  const router = useRouter();
  const { pin, email } = router.query;

  const passwordRequirements = createStringRequirements({
    minLength: 6,
    includeNumber: true,
    includeLowercase: true,
    includeUppercase: false,
    includeSpecial: false,
  });

  const isValidty = formRef.current?.checkValidity();
  const isFormValid = isPasswordValid && isConfirmPasswordValid;

  const handleChangeNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidty || newPassword !== confirmPassword) {
      toast.error("Senhas não coincidem");
    } else {
      try {
        await resetUserPassword({
          variables: {
            newPassword: newPassword,
            pin,
            email,
          },
        });
        toast.success("Sua senha foi alterada");
        formRef.current?.reset();
        setsucessChangePassword(true);
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      } catch (er) {
        toast.error("Não foi possível alterar sua senha");
        formRef.current?.reset();
      }
    }
  };

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setNewPassword(password);
      setIsPasswordValid(e.target.validity.valid);
      setArePasswordsEqual(password === confirmPassword);
    },
    [confirmPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setConfirmPassword(password);
      setIsConfirmPasswordValid(e.target.validity.valid);
      setArePasswordsEqual(password === newPassword);
    },
    [newPassword]
  );
  return (
    <div className="flex flex-col gap-[81px] items-center mt-20">
      {sucessChangePassword ? (
        <div className=" w-full px-40">
          <Link href={{ pathname: "/signin" }}>
            <span className="flex items-center self-start gap-2">
              <TbArrowLeft /> Voltar a área de login
            </span>
          </Link>
          <main className="flex flex-col items-center mt-28 px-28  ">
            <div className="flex flex-col gap-6 items-center border-b border-b-gray-01 pb-16 ">
              <h1 className="text-success-01 text-5xl text-center">
                Sua senha foi alterada com sucesso!!!
              </h1>
              <span className="text-gray-04 ">Você será direcionado a área de login</span>
            </div>
            <div className=" py-16">
              <span className="text-center">Sua senha foi alterada com sucesso</span>
            </div>
          </main>
        </div>
      ) : (
        <div className="w-[672px] flex flex-col items-center justify-center h-full max-md:px-5  max-md:w-4/5">
          <h1 className="text-primary-05 text-5xl max-md:text-center">
            Alteração de senha
          </h1>
          <h2 className="text-sm text-gray-04 mt-1">Aqui você vai alterar a sua senha</h2>
          <form
            className="flex flex-col gap-3 w-full mt-8"
            onSubmit={handleChangeNewPassword}
            ref={formRef}
          >
            <InputElement
              type="password"
              name="newPassword"
              label="Nova senha"
              onChange={handlePasswordChange}
              placeholder="************"
              pattern={passwordRequirements.toString().slice(1, -1)}
              required
              className={clsx(!isPasswordValid && "input-invalid")}
            />
            <InputElement
              type="password"
              name="newPasswordConfirm"
              label="Confirmar nova senha"
              onChange={handleConfirmPasswordChange}
              placeholder="************"
              pattern={passwordRequirements.toString().slice(1, -1)}
              required
              className={clsx(!isConfirmPasswordValid && "input-invalid")}
            />
            <p className="block text-xs text-secondary-01 italic transition-all duration-700">
              Senha: mínimo 6 caracteres números e letras.
            </p>
            <div className="flex gap-4 mt-9 w-full ">
              <Link href={{ pathname: "/signin" }} className="w-full">
                <Button variant="secondary" className="">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                disabled={!isValidty || !isFormValid || !arePasswordsEqual}
              >
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default ChangePassword;
