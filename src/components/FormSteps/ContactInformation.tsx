import Input from "@components/Input";
import React from "react";
import Textarea from "@components/Textarea";
import useForm from "@hooks/useForm";

const ContactInformation = () => {
  const { updateForm, formData, updateFormTextarea } = useForm();
  const { linkedin, github, description } = formData;

  return (
    <>
      <Input
        label="Linkedin"
        name="linkedin"
        onBlur={updateForm}
        placeholder="linkedin.com/in/usuario1"
        defaultValue={linkedin}
      />
      <Input
        label="Portfólio / Github"
        name="github"
        onBlur={updateForm}
        placeholder="portfóliousuário.com.br"
        defaultValue={github}
      />
      <Textarea
        label="Descrição"
        name="description"
        required
        minLength={2}
        maxLength={400}
        value={description}
        onChange={updateFormTextarea}
        placeholder="Faça uma breve descrição sobre você"
      />
    </>
  );
};
export default ContactInformation;
