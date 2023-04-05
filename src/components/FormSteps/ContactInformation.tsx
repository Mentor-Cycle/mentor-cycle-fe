import Input from "@components/Input";
import React, { ChangeEvent } from "react";
import Textarea from "@components/Textarea";
import { useMultiStepFormContext } from "@hooks/useForm";
import { ActionType } from "Providers/form";

const ContactInformation = () => {
  const { formData, dispatch } = useMultiStepFormContext();
  const { linkedin, github, description } = formData;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: ActionType.UPDATE_FORM_DATA, payload: { [name]: value } });
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch({ type: ActionType.UPDATE_FORM_DATA, payload: { [name]: value } });
  };

  return (
    <>
      <Input
        label="Linkedin"
        name="linkedin"
        onBlur={handleInputChange}
        placeholder="linkedin.com/in/usuario1"
        defaultValue={linkedin}
      />
      <Input
        label="Portfólio / Github"
        name="github"
        onBlur={handleInputChange}
        placeholder="portfóliousuário.com.br"
        defaultValue={github}
      />
      <Textarea
        label="Usuário"
        name="description"
        value={description}
        onChange={handleTextAreaChange}
        placeholder="Faça uma breve descrição sobre você"
      />
    </>
  );
};
export default ContactInformation;
