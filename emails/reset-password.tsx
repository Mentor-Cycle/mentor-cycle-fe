import * as React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Preview } from "@react-email/preview";
import { Tailwind } from "@react-email/tailwind";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Img } from "@react-email/img";
import { Button } from "@react-email/button";
import { Column } from "@react-email/column";
import { Link } from "@react-email/link";

export const ResetPassword = () => (
  <Html>
    <Head />
    <Preview>Redefinir Senha</Preview>
    <Tailwind
      config={{
        theme: {
          fontFamily: {
            sans: ["Poppins", "sans-serif"],
          },
          colors: {
            transparent: "transparent",
            current: "currentColor",
            primary: {
              "05": "#580505",
              "03": "#BA0000",
            },
            secondary: {
              "02": "#212324",
            },
            gray: {
              "01": "#CECECE",
            },
            neutral: {
              "03": "#F3F3F3",
            },
          },
        },
      }}
    >
      <Container className="bg-neutral-03 font-sans text-gray-01">
        <Container className="bg-secondary-02 p-12 pb-4 rounded-lg rounded-b-none">
          <Heading className="text-primary-03 inline-flex">
            Ola!!
            <Img
              src={`/static/smile.svg`}
              width="32"
              height="32"
              alt="smile picture"
            />
          </Heading>
          <Text className="text-neutral-05">
            Solicitação de alteração de senha!
          </Text>
          <Hr />
          <Text className=" text-center">
            Olá [Nome do usuário], recebemos um pedido para troca da sua senha,
            clique no botão a baixo para realizar a alteração:
          </Text>
          <div className="flex justify-center items-center mt-16 max-w-xs m-auto cursor-pointer">
            <Button className="p-4 bg-primary-03 text-neutral-03 rounded-lg flex-1 text-center mx-auto">
              Alterar senha
            </Button>
          </div>
          <Text className=" mt-16">
            Caso não queira realizar essa ação desconsidere esse e-mail ou se
            não foi você que solicitou, recomendamos que realize a troca da
            senha.
          </Text>
          <Text className="text-right  font-bold">Equipe Mentor Cycle</Text>
          <Text className="text-right ">
            Obrigado por fazer parte dessa iniciativa
          </Text>
        </Container>
        <Container className="bg-primary-05 rounded-b-lg">
          <Section className="p-2">
            <Column className="text-center">
              <div className="w-[32px] h-[32px] px-12 py-6 rounded-sm">
                <Img
                  src={`/static/logo.png`}
                  width="40"
                  height="40"
                  alt="smile picture"
                />
              </div>
            </Column>
            <Column className="text-left w-56 text-gray-01">
              <Text className="text-left font-bold my-0">Contatos</Text>
              <div className="flex justify-start items-center gap-2 py-2 h-6 w-6">
                <Link href="https://www.linkedin.com/company/mentor-cycle/">
                  <Img
                    src={`/static/linkedin.svg`}
                    alt="LinkedIn icon"
                    className="w-6 h-6 object-fill"
                  />
                </Link>
                <Link href="https://discord.gg/WRD3uT3JaC">
                  <Img
                    src={`/static/discord.svg`}
                    alt="Discord icon"
                    className="w-6 h-6 object-fill"
                  />
                </Link>
              </div>
            </Column>
          </Section>
        </Container>
      </Container>
    </Tailwind>
  </Html>
);

export default ResetPassword;
