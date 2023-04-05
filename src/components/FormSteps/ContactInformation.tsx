import Input from "@components/Input";
import React from "react";
import { FormDataTypes } from "./FormSteps.types";
import Textarea from "@components/Textarea";

const ContactInformation = ({ formData }: FormDataTypes) => {
  const { linkedin, github, description } = formData;
  return (
    <>
      <Input
        label="Linkedin"
        name="linkedin"
        placeholder="linkedin.com/in/usuario1"
        defaultValue={linkedin}
      />
      <Input
        label="Portfólio / Github"
        name="github"
        placeholder="portfóliousuário.com.br"
        defaultValue={github}
      />
      <Textarea
        label="Usuário"
        name="description"
        defaultValue={description}
        placeholder="Faça uma breve descrição sobre você"
      />
    </>
  );
};
export default ContactInformation;
