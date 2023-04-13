import Image from "next/image";
import Input from "@components/Input";
import Button from "@components/Button";
import { useMutation } from "@apollo/client";
import { SEND_RESET_PASSWORD } from "services/apollo/mutations";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ChangePassword() {
  const [email, setEmail] = useState<string>("");
  const [sendResetPasswordEmail, { loading }] =
    useMutation(SEND_RESET_PASSWORD);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, errors } = await sendResetPasswordEmail({
      variables: {
        email,
      },
    });
    if (data?.sendResetPassword) {
      toast.success("Email enviado com sucesso");
      router.push("/");
    }
    if (errors) {
      toast.error("Erro ao enviar email");
    }
  };
  return (
    <main className="grid grid-cols-1 md:grid-cols-[395px,1fr] lg:grid-cols-[495px,1fr] xl:grid-cols-[595px,1fr] min-h-screen">
      <div className="bg-gradient-to-r from-primary-04 to-primary-02">
        <Image
          alt="Mentor Cycle Logo"
          src={"/logo.png"}
          width={96}
          height={88}
          className="relative mx-auto mt-22 md:ml-14 md:mb-64 lg:ml-24 xl:ml-40"
        />
        <div className="flex flex-col justify-center max-w-[357px] m-auto md:mt-64">
          <h2 className="text-neutral-01 text-3xl font-bold text-center sm:text-4.5xl sm:leading-11 md:text-left md:pr-5 md:ml-8 lg:ml-9">
            Comece o seu aprendizado por aqui!
          </h2>
          <p className="text-neutral-01 mt-5 text-sm sm:text-base text-center md:text-left md:mt-4 md:pr-4 md:ml-9 p-2 sm:p-0">
            Tire suas dúvidas de forma rápida e prática. Construa seu futuro sem
            dúvidas.
          </p>
        </div>
        <div className="absolute hidden md:block md:bottom-20 sm:pl-80 sm:left-6 lg:pl-96 lg:left-[60px] xl:left-40">
          <Image
            alt="logo mentor cycle -circle"
            src={"/circle.png"}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="bg-neutral-01 py-20 md:px-8">
        <div className="sm:max-w-xl mx-auto px-4 sm:px-0 ">
          <h1 className="mb-4 text-primary-05 text-4xl text-center sm:text-5xl md:text-left">
            Alteração de senha
          </h1>
          <p className="mt-2 text-center md:text-left max-w-[415px] text-gray-04 text-sm ">
            Preencha o campo para alterar sua senha
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[557px] mx-auto md:mx-0 3xl:max-w-[800px]"
          >
            <div className="mt-8 mb-6">
              <Input
                name="email"
                type="email"
                placeholder="user1@gmail.com"
                label="Email"
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                required
              />
            </div>
            <Button
              isLoading={loading}
              type="submit"
              size="small"
              className="md:mb-12"
            >
              Solicitar troca de senha
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ChangePassword;
