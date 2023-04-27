import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import StepperVertical from "@components/StepperVertical/StepperVertical";
import Image from "next/image";

import Select from "react-select";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  USER_UPDATE_DATA,
} from "services/apollo/mutations";
import { useUser } from "@hooks/useUser";
import { User } from "providers/user/AppContext";

const ModalSettings = ({ firstName, email, id, lastName }: User) => {
  const [dataSucessChange, setDataSucessChange] = useState(false);
  const [currentStep, setCurretStep] = useState(1);
  const { setUser } = useUser();

  const router = useRouter();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const [updateUser] = useMutation(USER_UPDATE_DATA);
  const [deactivateAccount] = useMutation(DELETE_ACCOUNT);

  const optionsTheme = [
    { value: "dark", label: "dark" },
    { value: "light", label: "light" },
  ];

  const optionsPerfil = [
    { value: "mentor", label: "Mentor" },
    { value: "mentorado", label: "Mentorado" },
    { value: "ambos", label: "Ambos" },
  ];

  async function handleChangePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { newPassword, newPasswordConfirm } = Object.fromEntries(
      formData.entries()
    );
    try {
      if (newPassword != newPasswordConfirm) {
        toast.error("As senhas precisam ser iguais");
        return;
      }
      await changePassword({
        variables: {
          userId: id,
          newPassword,
        },
      });
      setDataSucessChange(true);
      setTimeout(() => {
        router.push("/mentors");
      }, 5000);
    } catch (e) {
      console.log(e);
      toast.error("Não foi possível alterar a senha");
    }
  }

  async function handleUpdateUserData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    } = Object.fromEntries(formData.entries());
    try {
      const newUser = {
        firstName: newFirstName.toString() || firstName,
        lastName: newLastName.toString() || lastName,
        email: newEmail.toString() || email,
        id,
      };

      await updateUser({
        variables: newUser,
      });
      setUser(newUser);
      setDataSucessChange(true);
      setTimeout(() => {
        router.push("/mentors");
      }, 5000);
    } catch (er) {
      console.log(er);
    }
  }

  async function handleDeleteAccount() {
    try {
      await deactivateAccount({
        variables: {
          id,
        },
      });
      setDataSucessChange(true);
      setTimeout(() => {
        router.push("/mentors");
      }, 5000);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <div className="flex flex-col px-16 gap-[70px] w-[928px]">
      <h1 className=" self-start text-secondary-02 text-2xl font-bold">
        Configurações
      </h1>
      {dataSucessChange ? (
        <div className=" px-16">
          <main className="flex flex-col items-center">
            <div className="flex flex-col gap-6 items-center border-b border-b-gray-01 pb-16 ">
              <h1 className="text-success-01 text-5xl text-center">
                Seus dados foram alterados com sucesso!!!
              </h1>
              <span className="text-gray-04 ">
                Você será direcionado a home
              </span>
            </div>
            <div className="flex flex-col py-16">
              <strong>{firstName}.</strong>
              <span className="text-center">
                Seus dados foram alterados com sucesso
              </span>
            </div>
          </main>
        </div>
      ) : (
        <div className="flex w-full min-h-[600px]">
          <StepperVertical
            setCurrentStep={setCurretStep}
            steps={["Perfil", "Sistema", "Segurança"]}
            currentStep={currentStep}
            className="text-start w-60"
            clickable
          />
          {currentStep === 1 && (
            <div className="flex gap-10 w-full justify-center  ">
              <div className="flex flex-col gap-2">
                <Image src="/imgCard.png" alt="" width={136} height={136} />
                <button className="text-primary-03">Trocar foto</button>
              </div>
              <form
                className="flex flex-col gap-24 text-start w-full "
                onSubmit={handleUpdateUserData}
              >
                <div className="flex flex-col gap-5">
                  <Input
                    name="firstName"
                    label="Nome"
                    defaultValue={firstName}
                  />
                  <Input
                    name="lastName"
                    label="Sobrenome"
                    defaultValue={lastName}
                  />
                  <Input name="email" label="Email" defaultValue={email} />
                </div>
                <Button variant="secondary">Salvar alterações</Button>
              </form>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col w-2/4 gap-24">
              <div className="flex flex-col gap-10">
                <div className="text-start">
                  <label className="self-start text-secondary-03 font-bold">
                    Trocar Tema
                  </label>
                  <Select
                    options={optionsTheme}
                    unstyled
                    classNames={{
                      option: (state) =>
                        `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
                      control: (state) =>
                        `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md p-4 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[180px]`,
                      menu: (state) =>
                        `p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
                    }}
                  />
                </div>
                <div className="text-start">
                  <label className=" text-secondary-03 font-bold">
                    Tipo de perfil
                  </label>
                  <Select
                    options={optionsPerfil}
                    unstyled
                    classNames={{
                      option: (state) =>
                        `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
                      control: (state) =>
                        `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md p-4 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[180px]`,
                      menu: (state) =>
                        `p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
                    }}
                  />
                </div>
              </div>
              <Button variant="secondary">Salvar alterações</Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex gap-10 w-3/5 justify-center">
              <form
                className="flex flex-col gap-24 text-start w-full"
                onSubmit={handleChangePassword}
              >
                <div className="flex flex-col gap-5">
                  <Input
                    type="password"
                    name="newPassword"
                    label="Senha"
                    placeholder="**************"
                  />
                  <Input
                    type="password"
                    name="newPasswordConfirm"
                    label="Confirmar senha"
                    placeholder="**************"
                  />
                  <div className="flex flex-col gap-6">
                    <button
                      type="button"
                      className="text-primary-03 self-start"
                      onClick={handleDeleteAccount}
                    >
                      Deletar conta
                    </button>
                  </div>
                </div>

                <Button variant="secondary" isLoading={loading}>
                  Salvar alterações
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalSettings;
