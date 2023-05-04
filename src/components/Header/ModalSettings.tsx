import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import StepperVertical from "@components/StepperVertical/StepperVertical";
import Image from "next/image";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { useUser } from "@hooks/useUser";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import Swal from "sweetalert2";
import { GET_MENTORS } from "services/apollo/queries";
import {
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  USER_UPDATE_DATA,
} from "services/apollo/mutations";
import Dropzone from "@components/Dropzone/Dropzone";

interface ModalSettingsProps {
  firstName: string;
  email: string;
  id: string;
  lastName: string;
  setIsModalOpen: any;
}

const ModalSettings = ({
  firstName,
  email,
  id,
  lastName,
  setIsModalOpen,
}: ModalSettingsProps) => {
  const [dataSucessChange, setDataSucessChange] = useState(false);
  const [currentStep, setCurretStep] = useState(1);
  const { user, setUser } = useUser();

  const router = useRouter();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const [updateUser] = useMutation(USER_UPDATE_DATA, {
    refetchQueries: [{ query: GET_MENTORS }],
  });
  const [deactivateAccount] = useMutation(DELETE_ACCOUNT);

  const optionsTheme = [{ value: "soon", label: "Em breve" }];

  const optionsPerfil = [
    { value: "mentor", label: "Mentor" },
    { value: "mentorado", label: "Mentorado" },
  ];

  const optionsPerfilAfterLogin = user.isMentor
    ? [{ value: "mentorado", label: "Mentorado" }]
    : [{ value: "mentor", label: "Mentor" }];

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
      console.error(er);
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
      console.error(er);
    }
  }

  const handleSelectedProfile = (profile: any) => {
    setIsModalOpen(false);
    Swal.fire({
      title: "Tem certeza que deseja mudar de perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, mudar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await switchProfile(profile);
        Swal.fire("Mudança de perfil confirmada!", "", "success").then(
          (result) => {
            setIsModalOpen(result.isConfirmed);
          }
        );
      } else {
        setIsModalOpen(true);
      }
    });
  };

  async function switchProfile(profile: any) {
    try {
      const userInput = {
        ...user,
        id: user.id,
        isMentor: profile === "mentor",
      };

      const { data } = await updateUser({
        variables: {
          ...userInput,
        },
      });

      if (data && data.updateUser) {
        setUser(userInput);
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col sm:min-w-[420px] md:min-w-[600px] lg:min-w-[920px] 2xl:min-w-[1100px] min-h-[80vh] sm:px-28 sm:py-16">
      <h1 className="self-center mb-4 sm:mb-0 lg:self-start text-secondary-02 text-2xl font-bold lg:mb-16">
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
        <div className="flex flex-col lg:flex lg:flex-row">
          <StepperVertical
            setCurrentStep={setCurretStep}
            steps={["Perfil", "Sistema", "Segurança"]}
            currentStep={currentStep}
            className="text-start"
            clickable
          />
          {currentStep === 1 && (
            <div className="flex flex-col lg:flex lg:flex-row justify-center lg:min-w-[504px] transition-all duration-700">
              <div className="flex flex-col m-auto lg:m-0 lg:flex lg:flex-col lg:mr-10">
                <Image
                  src={user.photoUrl || "/imgCard.png"}
                  alt=""
                  width={136}
                  height={136}
                />
                <Dropzone />
              </div>
              <form
                className="flex flex-col m-auto lg:m-0 px-2 lg:p-0 text-start w-full max-w-[328px] "
                onSubmit={handleUpdateUserData}
              >
                <div className="flex flex-col gap-6">
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
                <Button variant="secondary" className="mt-10">
                  Salvar alterações
                </Button>
              </form>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col items-end sm:min-w-[340px] gap-[80px] px-2">
              <div className="flex flex-col gap-6 max-w-[328px] w-full  m-auto sm:m-0">
                <div className="text-start">
                  <label className="self-start text-secondary-03 font-bold opacity-30">
                    Trocar Tema
                  </label>
                  <Select
                    options={optionsTheme}
                    isDisabled={true}
                    placeholder={"Em breve"}
                    unstyled
                    classNames={{
                      option: (state) =>
                        `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
                      control: (state) =>
                        `${
                          state.isDisabled
                            ? "opacity-30 hover:cursor-not-allowed"
                            : ""
                        } bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md p-4 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[180px]`,
                      menu: (state) =>
                        ` p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
                    }}
                  />
                </div>
                <div className="text-start">
                  <label className=" text-secondary-03 font-bold">
                    Tipo de perfil
                  </label>
                  <Select
                    options={optionsPerfilAfterLogin}
                    defaultValue={
                      user.isMentor ? optionsPerfil[0] : optionsPerfil[1]
                    }
                    // value={selectedChangeProfile}
                    onChange={(option) => handleSelectedProfile(option?.value)}
                    unstyled
                    classNames={{
                      option: ({ isSelected }) =>
                        `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
                      control: (state) =>
                        `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md p-4 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[180px]`,
                      menu: (state) =>
                        `p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
                    }}
                  />
                </div>
                <Button className="mt-32" variant="secondary">
                  Salvar alterações
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex gap-10 sm:min-w-[328px] justify-center">
              <form
                className="flex flex-col text-start w-full"
                onSubmit={handleChangePassword}
              >
                <div className="flex flex-col gap-6 px-2">
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
                      className="text-primary-03 self-start "
                      onClick={handleDeleteAccount}
                    >
                      Deletar conta
                    </button>
                  </div>
                  <Button
                    className="mt-20"
                    variant="secondary"
                    isLoading={loading}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalSettings;
