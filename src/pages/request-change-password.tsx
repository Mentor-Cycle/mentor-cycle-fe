import Image from "next/image";
import Input from "@components/Input";
import Button from "@components/Button";
import { useMutation } from "@apollo/client";
import { SEND_RESET_PASSWORD } from "services/apollo/mutations";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ChangePassword() {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [sendResetPasswordEmail, { loading }] =
    useMutation(SEND_RESET_PASSWORD);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await sendResetPasswordEmail({
        variables: {
          email,
        },
      });
      if (data?.sendResetPassword) {
        toast.success("Email enviado com sucesso");
        router.push("/");
      }
      setOpen(true);
    } catch (error) {
      toast.error("Erro ao enviar email");
    }
  };
  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-[395px,1fr] lg:grid-cols-[495px,1fr] xl:grid-cols-[595px,1fr]">
      <div className="bg-gradient-to-r from-primary-04 to-primary-02 dark:from-primary-04 dark:to-primary-05">
        <Image
          alt="Mentor Cycle Logo"
          src={"/logo.png"}
          width={96}
          height={88}
          className="relative mx-auto mt-22 md:mb-64 md:ml-14 lg:ml-24 xl:ml-40"
        />
        <div className="m-auto flex max-w-[357px] flex-col justify-center md:mt-64">
          <h2 className="text-center text-3xl font-bold text-neutral-01 sm:text-4.5xl sm:leading-11 md:ml-8 md:pr-5 md:text-left lg:ml-9">
            Comece o seu aprendizado por aqui!
          </h2>
          <p className="mt-5 p-2 text-center text-sm text-neutral-01 sm:p-0 sm:text-base md:ml-9 md:mt-4 md:pr-4 md:text-left">
            Tire suas dúvidas de forma rápida e prática. Construa seu futuro sem
            dúvidas.
          </p>
        </div>
        <div className="absolute hidden sm:left-6 sm:pl-80 md:bottom-20 md:block lg:left-[60px] lg:pl-96 xl:left-40">
          <Image
            alt="logo mentor cycle -circle"
            src={"/circle.png"}
            width={100}
            height={100}
            className="dark:rotate-180"
          />
        </div>
      </div>
      <div className="py-20 md:px-8">
        <div className="mx-auto px-4 sm:max-w-xl sm:px-0 ">
          <h1 className="mb-4 text-center text-4xl text-primary-05 sm:text-5xl md:text-left">
            Alteração de senha
          </h1>
          <p className="mt-2 max-w-[415px] text-center text-sm text-gray-04 md:text-left ">
            Preencha o campo para alterar sua senha
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[557px] flex-col md:mx-0 3xl:max-w-[800px]"
          >
            <div className="mb-6 mt-8">
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
