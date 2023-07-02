import { useMutation } from "@apollo/client";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Input from "@components/Input";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext, initialValue } from "providers/user/AppContext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedinOption } from "react-icons/gr";
import { toast } from "react-toastify";
import { SIGN_IN_USER } from "services/apollo/mutations";
import { GET_IS_USER_LOGGED } from "services/apollo/queries";

import client from "services/apollo/apollo-client";
import TermsAndPrivacyPopup from "@components/TermsAndPrivacyPopup/TermsAndPrivacyPopup";

const SignIn: NextPage = () => {
  const router = useRouter();
  const refForm = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  const handleStrategyLogin = async (route: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL + route}`;
  };

  const [signInUser, { loading }] = useMutation(SIGN_IN_USER);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const hasAgreedToTermsAndPrivacy = localStorage.getItem("hasAgreedToTermsAndPrivacy");
    if (!hasAgreedToTermsAndPrivacy) {
      setTimeout(() => {
        setOpen(true);
      }, 1000);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { email, password, rememberMe } = Object.fromEntries(formData.entries());

    const isValid = refForm.current?.checkValidity();

    if (isValid) {
      try {
        await signInUser({
          variables: {
            email,
            password,
            rememberMe: rememberMe === "on",
          },
        });
        setUser(initialValue);
        refForm.current?.reset();

        localStorage.removeItem("form-data");
        router.replace("/dashboard");
      } catch (error) {
        toast.error("Erro ao realizar login, tente novamente!");
      }
    }
  };

  useEffect(() => {
    async function checkIfUserIsLogged() {
      const { data } = await client.query({
        query: GET_IS_USER_LOGGED,
      });
      if (data.isUserLogged) {
        router.replace("/dashboard");
      }
    }
    checkIfUserIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      <TermsAndPrivacyPopup open={open} setOpen={setOpen} />
      <div className="relative bg-gradient-to-r from-primary-04 to-primary-02 dark:from-primary-04 dark:to-primary-05 py-16 col-span-1 md:col-span-6 md:py-0 md:pl-12 lg:pl-32 md:pr-2">
        <Image
          alt="Mentor Cycle Logo"
          src={"/logo.png"}
          width={96}
          height={88}
          className="mx-auto md:mx-0 md:mt-22"
        />
        <div className="flex flex-col justify-center max-w-[357px] 2xl:max-w-[500px] m-auto md:m-0 lg:mt-32">
          <h2 className="text-neutral-01 text-3xl sm:text-4.5xl p-2 sm:p-0 sm:leading-11 font-bold text-center md:text-left md:mt-0 md:pt-40">
            Comece o seu aprendizado por aqui!
          </h2>
          <p className="text-neutral-01 mt-2 text-sm sm:text-base text-center md:text-left p-2 sm:p-0 2xl:text-xl">
            Tire suas dúvidas de forma rápida e prática. Construa seu futuro sem dúvidas.
          </p>
        </div>
        <div className="absolute hidden md:block md:bottom-3 md:-right-11">
          <Image
            className="dark:rotate-180"
            alt="logo mentor cycle -circle"
            src={"/circle.png"}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="bg-neutral-01 dark:bg-secondary-02 col-span-1 md:col-span-6 py-16 md:px-8">
        <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
          <h1 className="mt-0 mb-4 text-primary-05 text-5xl text-center md:text-left dark:text-neutral-01">
            Bem-Vindo ao Mentor Cycle!
          </h1>
          <p className="mt-2 text-center md:text-left max-w-[415px]">
            Já possui uma conta? Preencha os campos para entrar na plataforma
          </p>
          <form
            ref={refForm}
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[557px] mx-auto md:mx-0 3xl:max-w-[800px]"
          >
            <div className="mt-8">
              <Input
                name="email"
                type="email"
                placeholder="user1@gmail.com"
                label="Email"
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="******************"
                label="Senha"
                required
              />
              <div className="flex flex-row justify-between mb-4 md:mb-12">
                <Checkbox
                  id="savedPassword"
                  label="Lembrar minha senha"
                  className="mt-2"
                  name="rememberMe"
                />
                <Link
                  href="/request-change-password"
                  className="mt-2.5 text-sm text-gray-05 hover:underline dark:text-neutral-04"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              isLoading={loading}
              size="small"
              className="mb-4 md:mb-12"
            >
              Entrar
            </Button>
          </form>
          <div className="flex flex-col max-w-[557px] mx-auto md:mx-0 3xl:max-w-[700px]">
            {/* <Button */}
            {/*   onClick={() => handleStrategyLogin("/auth/google")} */}
            {/*   size="small" */}
            {/*   variant="terciary" */}
            {/*   className="mb-4" */}
            {/* > */}
            {/*   <Button.Icon icon={FcGoogle} /> */}
            {/*   Entrar com Google */}
            {/* </Button> */}
            <Button
              onClick={() => handleStrategyLogin("/auth/linkedin")}
              size="small"
              variant="terciary"
            >
              <Button.Icon icon={GrLinkedinOption} className="text-[#0e76a8]" />
              Entrar com Linkedin
            </Button>
            <p className="text-primary-05 dark:text-neutral-01 mt-6 md:mt-14 md:ml-4 text-center md:text-left">
              Não tem uma conta?{" "}
              <Link
                href="/signup/register"
                className="text-primary-03 dark:text-primary-01 hover:text-primary-02 dark:hover:text-primary-03"
              >
                Se registre aqui!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SignIn;
