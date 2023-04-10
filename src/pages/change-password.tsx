import { useMutation } from "@apollo/client";
import Button from "@components/Button";
import Header from "@components/Header/Header";
import Input from "@components/Input/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";
import { CHANGE_NEW_PASSWORD } from "services/apollo/mutations";

const ChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [resetUserPassword] = useMutation(CHANGE_NEW_PASSWORD);

  const router = useRouter();
  const { pin, email } = router.query;

  const handleChangeNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const { newPassword, newPasswordConfirm } = Object.fromEntries(
      formData.entries()
    );

    const isValidty = formRef.current?.checkValidity();

    if (!isValidty || newPassword != newPasswordConfirm) {
      alert("senhas não coincidem");
      return;
    } else {
      try {
        await resetUserPassword({
          variables: {
            newPassword,
            pin,
            email,
          },
        });
        alert("sucesso");
        formRef.current?.reset();
      } catch (er) {
        console.log(er);
      }
    }
  };

  return (
    <div className="flex flex-col gap-[81px] items-center">
      <Header isLogged={false} />
      <div className="w-[672px] flex flex-col items-center justify-center h-full max-md:px-5  max-md:w-4/5">
        <h1 className="text-primary-05 text-5xl max-md:text-center">
          Alteração de senha
        </h1>
        <h2 className="text-sm text-gray-04 mt-1">
          Aqui você vai alterar a sua senha
        </h2>
        <form
          className="flex flex-col gap-3 w-full mt-8"
          onSubmit={handleChangeNewPassword}
          ref={formRef}
        >
          <Input
            type="password"
            name="newPassword"
            label="Nova senha"
            placeholder="************"
            required
          />
          <Input
            type="password"
            name="newPasswordConfirm"
            label="Confirmar nova senha"
            placeholder="************"
            required
          />
          <div className="flex gap-4 mt-9 w-full ">
            <Link href={{ pathname: "/signin" }} className="w-full">
              <Button variant="secondary" className="">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="primary">
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
