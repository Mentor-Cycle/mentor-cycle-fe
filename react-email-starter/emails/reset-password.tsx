import { Button } from "@react-email/button";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
  Hr,
  Section,
  Column,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.URL ? `https://${process.env.URL}` : "";

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
              "04": "#790404",
              "03": "#BA0000",
              "02": "#E43D3D",
              "01": "#F36B6B",
            },
            secondary: {
              "05": "#0B0C0D",
              "04": "#0C0E0F",
              "03": "#171818",
              "02": "#212324",
              "01": "#343434",
            },
            gray: {
              "05": "#3E3E3E",
              "04": "#535353",
              "03": "#7C7C7C",
              "02": "#989898",
              "01": "#CECECE",
            },
            neutral: {
              "05": "#E4E4E4",
              "04": "#F3EEEE",
              "03": "#F3F3F3",
              "02": "#F8F8F8",
              "01": "#FEFEFE",
            },
            success: {
              "01": "#237C00",
              "02": "#3EB80E",
              "03": "#E4F9DA",
            },
            danger: {
              "01": "#EA172E",
              "02": "#EE4B4B",
              "03": "#FCD2D2",
            },
            info: {
              "01": "#1F62A5",
              "02": "#61AEE7",
              "03": "#C7DEEF",
            },
            waiting: {
              "01": "#F8BA1B",
              "02": "#FFD234",
            },
            link: {
              "01": "#3201BE",
              "02": "#2420F9",
            },
          },
        },
      }}
    >
      <Body className="bg-neutral-03 font-sans">
        <Container className="border border-link-02 bg-secondary-02 p-12 pb-4 rounded-lg rounded-b-none">
          <Heading className="text-primary-03 inline-flex">
            Ola!!
            <Img
              src={`${baseUrl}/static/smile.svg`}
              width="32"
              height="32"
              alt="smile picture"
            />
          </Heading>
          <Text className="text-neutral-05">
            Solicitação de alteração de senha!
          </Text>
          <Hr />
          <Text className="text-gray-01 text-center">
            Olá [Nome do usuário], recebemos um pedido para troca da sua senha,
            clique no botão a baixo para realizar a alteração:
          </Text>
          <div className="flex justify-center items-center mt-16 max-w-xs m-auto cursor-pointer">
            <Button className="p-4 bg-primary-03 text-neutral-03 rounded-lg flex-1 text-center">
              Alterar senha
            </Button>
          </div>
          <Text className="text-gray-01 mt-16">
            Caso não queira realizar essa ação desconsidere esse e-mail ou se
            não foi você que solicitou, recomendamos que realize a troca da
            senha.
          </Text>
          <Text className="text-right text-gray-01 font-bold">
            Equipe Mentor Cycle
          </Text>
          <Text className="text-right text-gray-01">
            Obrigado por fazer parte dessa iniciativa
          </Text>
        </Container>
        <Container className="bg-primary-05 rounded-b-lg">
          <Section className="p-2">
            <Column className="text-center">
              <div className=" w-[32px] h-[32px] px-12 py-6 rounded-sm">
                <Img
                  src={`${baseUrl}/static/logo.png`}
                  width="40"
                  height="40"
                  alt="smile picture"
                />
              </div>
            </Column>
            <Column className="text-center w-[35%] text-gray-01">
              <Text className="text-left font-bold my-0">Contatos</Text>
              <Text className="my-0">Telefone: +55 (85) 9998-6110</Text>
              <Text className="my-0">E-mail: contato@idip.com.br</Text>
              <div className="flex justify-start items-center gap-2 p-2 h-6 w-6">
                <Img
                  src={`${baseUrl}/static/linkedin.svg`}
                  alt="LinkedIn icon"
                  className="w-6 h-6 object-fill"
                />
                <Img
                  src={`${baseUrl}/static/youtube.svg`}
                  alt="YouTube icon"
                  className="w-6 h-6 object-contain"
                />
                <Img
                  src={`${baseUrl}/static/instagram.svg`}
                  alt="Instagram icon"
                  className="w-6 h-6 object-cover"
                />
              </div>
            </Column>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ResetPassword;
