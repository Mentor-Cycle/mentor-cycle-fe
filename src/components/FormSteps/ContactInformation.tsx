import Input from "@components/Input";
import Textarea from "@components/Textarea";
import useForm from "@hooks/useForm";
import { useState } from "react";
import { z } from "zod";

const ContactInformation = () => {
  const { updateForm, updateFormTextarea, formData } = useForm();

  const { linkedin, github, description } = formData;

  const linkedinSchema = z
    .string()
    .url({ message: "URL do LinkedIn inválida" });
  const githubSchema = z.string().url({ message: "URL do GitHub inválida" });

  const [errors, setErrors] = useState<Record<string, string | null>>({
    linkedin: null,
    github: null,
  });

  const validateLinkedIn = () => {
    try {
      linkedinSchema.parse(linkedin);
      setErrors((prevErrors) => ({ ...prevErrors, linkedin: null }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, linkedin: error.message }));
    }
  };

  const validateGitHub = () => {
    try {
      githubSchema.parse(github);
      setErrors((prevErrors) => ({ ...prevErrors, github: null }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, github: error.message }));
    }
  };

  const isFormValid = () => {
    try {
      linkedinSchema.parse(linkedin);
      githubSchema.parse(github);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // Aqui você pode executar a lógica de envio do formulário
      console.log("Formulário válido. Enviando...");
      console.log("Dados do formulário:", { linkedin, github, description });
    } else {
      console.log("Formulário inválido. Não pode ser enviado.");
    }
  };

  return (
    <>
      <Input
        label="Linkedin"
        name="linkedin"
        onBlur={() => {
          validateLinkedIn();
        }}
        placeholder="linkedin.com/in/usuario1"
        value={linkedin}
        onChange={(e) => updateForm(e)}
        onError={errors.linkedin}
      />
      <Input
        label="Portfólio / Github"
        name="github"
        onBlur={() => {
          validateGitHub();
        }}
        placeholder="portfóliousuário.com.br"
        value={github}
        onChange={(e) => updateForm(e)}
        onError={errors.github}
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
      <button onClick={handleSubmit} disabled={!isFormValid()}>
        Enviar
      </button>
    </>
  );
};

export default ContactInformation;
