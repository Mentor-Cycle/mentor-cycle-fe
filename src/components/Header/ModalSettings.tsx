import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import StepperVertical from "@components/StepperVertical/StepperVertical";
import { initialValue } from "providers/user/AppContext";
import Image from "next/image";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { useUser } from "@hooks/useUser";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { GET_ME, GET_MENTORS } from "services/apollo/queries";
import {
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  LOGOUT_USER,
  USER_UPDATE_DATA,
} from "services/apollo/mutations";
import Dropzone from "@components/Dropzone/Dropzone";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { createStringRequirements } from "utils/regex";
import { IUserSession } from "types/user.types";

interface ModalSettingsProps
  extends Pick<IUserSession, "email" | "firstName" | "lastName" | "id"> {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
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
  const [signOutUser] = useMutation(LOGOUT_USER);
  const { theme } = useTheme();

  const router = useRouter();
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const [updateUser] = useMutation(USER_UPDATE_DATA, {
    refetchQueries: [GET_MENTORS, GET_ME],
  });
  const [deactivateAccount] = useMutation(DELETE_ACCOUNT);

  const passwordRequirements = createStringRequirements({
    minLength: 6,
    includeNumber: true,
    includeLowercase: true,
    includeUppercase: false,
    includeSpecial: false,
  });

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
    } catch (error) {
      toast.error(`Não foi possível alterar a senha`);
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
        ...user,
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
    } catch (error) {
      toast.error(
        `Não foi possível salvar as alterações, verifique se os dados estão corretos`
      );
    }
  }

  const logOutUser = async () => {
    await signOutUser();
    setUser(initialValue);
    localStorage.removeItem("user");
  };

  async function handleDeleteAccount() {
    setIsModalOpen(false);
    Swal.fire({
      title: "Tem certeza que deseja desativar sua conta?",
      background: `${theme === "dark" ? "#212324" : "#FAFAFA"}`,
      showCancelButton: true,
      confirmButtonColor: "#BA0000",
      cancelButtonColor: "#343434",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsModalOpen(true);
        try {
          await deactivateAccount({
            variables: {
              id,
            },
          });
          setDataSucessChange(true);
          setIsModalOpen(false);
          toast.info("A sua conta foi desativada");
          localStorage.removeItem("form-data");
          setUser({} as IUserSession);
          await logOutUser();
        } catch (error) {
          toast.error(
            "Ocorreu um erro ao desativar a conta. Tente novamente mais tarde."
          );
          console.error(error);
          setIsModalOpen(false);
        }
      } else {
        setIsModalOpen(true);
      }
    });
  }

  const handleSelectedProfile = (profile: any) => {
    setIsModalOpen(false);
    Swal.fire({
      title: "Tem certeza que deseja mudar de perfil?",
      background: `${theme === "dark" ? "#212324" : "#FAFAFA"}`,
      showCancelButton: true,
      confirmButtonColor: "#BA0000",
      cancelButtonColor: "#343434",
      confirmButtonText: "Sim, mudar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await switchProfile(profile);
        setIsModalOpen(true);
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
    <div className="flex flex-col min-w-[92vw] sm:min-w-[420px] md:min-w-[600px] lg:min-w-[920px] 2xl:min-w-[1100px] min-h-[80vh] p-2 sm:p-10 lg:p-20">
      <h1 className="self-center mb-4 sm:mb-0 lg:self-start text-secondary-02 text-2xl font-bold lg:mb-16">
        Configurações
      </h1>
      {dataSucessChange ? (
        <div className=" px-16">
          <main className="flex flex-col items-center">
            <div className="flex flex-col gap-6 items-center border-b border-b-gray-01 pb-16 ">
              <h1 className="text-secondary-02 text-5xl text-center">
                Seus dados foram alterados com sucesso!!!
              </h1>
            </div>
            <div className="flex flex-col py-16">
              <strong className="text-secondary-02 dark:text-gray-01">
                {firstName}.
              </strong>
              <span className="text-center text-success-01 dark:text-success-02">
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
            <div className="flex flex-col lg:flex lg:flex-row justify-center lg:min-w-[504px] transition-all duration-700 min-h-[480px] ">
              <div className="flex flex-col justify-center items-center sm:justify-start  m-auto lg:m-0 lg:flex lg:flex-col lg:mr-10">
                <Image
                  src={user.photoUrl || "/imgCard.png"}
                  alt=""
                  width={136}
                  height={136}
                  className="rounded-lg"
                />
                <Dropzone setIsModalOpen={setIsModalOpen} />
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
                    defaultValue={lastName ?? ""}
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    defaultValue={email}
                  />
                </div>
                <Button type="submit" variant="secondary" className="mt-10">
                  Salvar alterações
                </Button>
              </form>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col items-end sm:min-w-[340px] gap-[80px] px-2 mt-8 lg:mt-0 min-h-[480px] ">
              <div className="flex flex-col gap-6  w-full  m-auto sm:m-0">
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
              </div>
              <Button
                className={clsx(currentStep === 2 && "hidden")}
                variant="secondary"
              >
                Salvar alterações
              </Button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex gap-10 sm:min-w-[328px] justify-center min-h-[480px] ">
              <form
                className="flex flex-col text-start w-full"
                onSubmit={handleChangePassword}
              >
                <div className="flex flex-col gap-6 mt-8 lg:mt-0">
                  <Input
                    type="password"
                    name="newPassword"
                    label="Senha"
                    pattern={passwordRequirements.toString().slice(1, -1)}
                    placeholder="**************"
                  />
                  <Input
                    type="password"
                    name="newPasswordConfirm"
                    label="Confirmar senha"
                    pattern={passwordRequirements.toString().slice(1, -1)}
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
                  <Button type="submit" variant="secondary" isLoading={loading}>
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
