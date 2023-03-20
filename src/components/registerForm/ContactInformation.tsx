import Input from "@components/Input";
import React from "react";
import { FormDataTypes } from "./FormSteps.types";

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
      <label htmlFor="description" className="font-semibold">
        Descrição
      </label>
      <textarea
        placeholder="Faça uma breve descrição sobre você"
        name="description"
        id="description"
        cols={30}
        rows={2}
        className="border border-gray-03 bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer max-w-2xl w-full px-6 py-4 rounded-lg"
        defaultValue={description}
      ></textarea>
    </>
  );
};
export default ContactInformation;
