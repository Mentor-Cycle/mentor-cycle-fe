import { useMutation } from "@apollo/client";
import Button from "@components/Button/Button";
import { InputElement } from "@components/Input";
import Modal from "@components/Modal";
import Textarea from "@components/Textarea/Textarea";
import { useUser } from "@hooks/useUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { USER_UPDATE_DATA } from "services/apollo/mutations";
import { IEditProfileFormData, ILocationInterface } from "./EditProfileModal.types";
import SelectLocation from "@components/LocationSelector/SelectLocation";
import { Country, State } from "@hooks/useFetch.types";
import { useFetch } from "@hooks/useFetch";
import { GET_ME, GET_MENTORS } from "services/apollo/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IEditProfileSubmitData,
  editProfileFormSchema,
} from "@components/Modal/EditProfile/EditProfileModal.form";
import { z } from "zod";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { Input } from "@components/InputForm";
import { Controller } from "react-hook-form";
import { useSkillsFactory } from "factories/useSkillsFactory";
import { IUserSession } from "types/user.types";

function getDefaultValues<T>(userCurrent: IUserSession): T {
  return {
    firstName: userCurrent.firstName,
    lastName: userCurrent.lastName,
    biography: userCurrent.biography ?? "",
    country: userCurrent.country,
    description: userCurrent.description,
    github: userCurrent.github ?? "",
    linkedin: userCurrent.linkedin ?? "",
    jobTitle: userCurrent.jobTitle ?? "",
    skills: userCurrent.skills ?? [],
    yearsOfExperience: userCurrent.yearsOfExperience || 0,
  } as T;
}

const EditProfileModal = () => {
  const { user: userCurrent, setUser } = useUser();
  const { EDIT_PROFILE_MODAL, closeModal } = useModal();
  const methods = useForm<IEditProfileFormData>({
    defaultValues: getDefaultValues<IEditProfileFormData>(userCurrent),
  });
  const { register, reset, handleSubmit, control, watch } = methods;

  const Skills = useSkillsFactory(methods as any);

  const [updateUser, { loading }] = useMutation<{}, IEditProfileSubmitData>(
    USER_UPDATE_DATA,
    {
      refetchQueries: [GET_MENTORS, GET_ME],
    }
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ILocationInterface | null>(null);
  const [selectedStates, setSelectedStates] = useState<ILocationInterface | null>(null);
  const { getCountries, getStates } = useFetch();

  useEffect(() => {
    getCountries().then(setCountries);

    if (selectedCountry?.value === "Brasil") {
      getStates().then(setStates);
    } else {
      setSelectedStates(null);
    }
  }, [getCountries, getStates, selectedCountry]);

  const submitHandler: SubmitHandler<IEditProfileFormData> = async (form) => {
    try {
      const updatedUser = editProfileFormSchema.parse({
        ...form,
        country: selectedCountry?.label || userCurrent.country,
        state: selectedStates?.label || userCurrent.state,
        id: userCurrent.id,
      });

      const { data } = await updateUser({
        variables: updatedUser,
      });

      if (data) {
        setUser({
          ...userCurrent,
          ...updatedUser,
        });

        toast.success("Alterações realizadas com sucesso!");
        closeModal(ModalActionTypes.EDIT_PROFILE_MODAL);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error: unknown) => {
    if (error instanceof z.ZodError) {
      const [issue] = error.issues;
      return toast.error(issue.message);
    }

    const errorMessages: Record<string, string> = {
      "Unique constraint failed on the fields: (`email`)":
        "Este email já possui cadastro",
    };

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao editar o Perfil tente novamente mais tarde";
    const matchingErrorKey = Object.keys(errorMessages).find((key) =>
      errorMessage.includes(key)
    );

    if (matchingErrorKey) {
      toast.error(errorMessages[matchingErrorKey]);
    } else {
      toast.error(errorMessage);
    }
  };

  const handleLocationChange =
    (setState: Dispatch<SetStateAction<ILocationInterface | null>>) =>
    ({ value, label }: ILocationInterface) => {
      setState({ label, value });
    };

  useEffect(() => {
    if (EDIT_PROFILE_MODAL) {
      reset(getDefaultValues(userCurrent));
    }
  }, [EDIT_PROFILE_MODAL]);

  return (
    <Modal
      open={EDIT_PROFILE_MODAL}
      onOpenChange={() => closeModal(ModalActionTypes.EDIT_PROFILE_MODAL)}
    >
      <div
        data-testid="edit-profile-modal-wrapper"
        className="max-xl:px-5 py-16 w-[300px] xs:w-[380px] sm:w-[600px] md:w-auto p-2 lg:px-20"
      >
        <form
          className="max-md:w-auto md:w-[672px] text-start"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <InputElement
              type="text"
              label="Nome"
              pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
              {...register("firstName")}
            />
            <InputElement
              type="text"
              label="Sobrenome"
              pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
              {...register("lastName")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputElement
              type="text"
              label="Profissão"
              pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
              {...register("jobTitle")}
            />
            <Textarea label="Bio" {...register("biography")} />
            <Textarea label="Experiência" {...register("description")} />
            <SelectLocation
              onSelect={handleLocationChange(setSelectedCountry)}
              name="country"
              label="Pais"
              requiredField={true}
              options={countries}
              placeholder="Selecione um Pais"
              value={
                selectedCountry || {
                  label: userCurrent.country,
                  value: userCurrent.country,
                }
              }
            />
            <SelectLocation
              onSelect={handleLocationChange(setSelectedStates)}
              label="Estado"
              name="state"
              requiredField={true}
              options={states}
              placeholder="Selecione um Estado"
              value={
                selectedStates || {
                  label: userCurrent.state,
                  value: userCurrent.state,
                }
              }
              isDisabled={selectedCountry?.value !== "Brasil"}
            />
            <InputElement
              label="Linkedin"
              placeholder="linkedin.com/in/usuario1"
              {...register("linkedin")}
            />
            <InputElement
              label="Portifólio/Github"
              placeholder="portfóliousuário.com.br"
              {...register("github")}
            />
            <InputElement
              type="number"
              max={45}
              min={0}
              label="Anos experiência"
              required
              {...register("yearsOfExperience")}
            />
            <Input.Root grow={1} className="my-2.5">
              <Input.Label label="Especialização" htmlFor={Skills.inputId} required />
              <Controller
                name="skills"
                control={control}
                render={({ field }) => {
                  return (
                    <Input.MultiSelect
                      id={Skills.inputId}
                      options={Skills.options}
                      tabIndex={20}
                      isLoading={Skills.isLoading}
                      {...field}
                      ref={null}
                    />
                  );
                }}
              />
              <Input.Error errorMessage={Skills.errors} />
            </Input.Root>
          </div>
          <Button type="submit" className="mt-7" disabled={loading} isLoading={loading}>
            Salvar
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
