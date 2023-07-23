import { useMutation } from "@apollo/client";
import Button from "@components/Button/Button";
import Input from "@components/Input";
import SelectLocation from "@components/LocationSelector/SelectLocation";
import {
  IEditProfileSubmitData,
  editProfileFormSchema,
} from "@components/Modal/EditProfile/EditProfileModal.form";
import SelectSkillsInput from "@components/MultiSelect/SelectSkillsInput";
import Textarea from "@components/Textarea/Textarea";
import { useFetch } from "@hooks/useFetch";
import { Country, State } from "@hooks/useFetch.types";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { useUser } from "@hooks/useUser";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { USER_UPDATE_DATA } from "services/apollo/mutations";
import { GET_ME, GET_MENTORS, GET_SKILLS } from "services/apollo/queries";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { z } from "zod";
import { Modal } from "../Modal";
import { IEditProfileFormData, ILocationInterface } from "./EditProfileModal.types";

const EditProfileModal = () => {
  const { user: userCurrent, setUser } = useUser();
  const { EDIT_PROFILE_MODAL, closeModal } = useModal();
  const { register, reset, handleSubmit } = useForm<IEditProfileFormData>();
  const { data: skills, error } = useTypedQuery(api.GET_SKILLS);
  if (error?.error) console.log("error", error);

  const options = skills ? skills?.findAllSkills.map((opt) => opt.name) : [];

  const [updateUser, { loading }] = useMutation<{}, IEditProfileSubmitData>(
    USER_UPDATE_DATA,
    {
      refetchQueries: [GET_MENTORS, GET_ME],
    }
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<ILocationInterface | null>(null);
  const [selectedStates, setSelectedStates] =
    useState<ILocationInterface | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { getCountries, getStates } = useFetch();

  useEffect(() => {
    getCountries().then(setCountries);

    if (selectedCountry?.value === "Brasil") {
      getStates().then(setStates);
    } else {
      setSelectedStates(null);
    }
  }, [getCountries, getStates, selectedCountry]);

  useEffect(() => {
    if (userCurrent.skills) setSelectedSkills(userCurrent.skills);
  }, [userCurrent.skills]);

  const submitHandler: SubmitHandler<IEditProfileFormData> = async (form) => {
    try {
      const updatedUser = editProfileFormSchema.parse({
        ...form,
        country: selectedCountry?.label || userCurrent.country,
        state: selectedStates?.label || userCurrent.state,
        skills: selectedSkills,
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
        reset();
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

  return (
    <Modal.Root
      open={EDIT_PROFILE_MODAL}
      onOpenChange={() => closeModal(ModalActionTypes.EDIT_PROFILE_MODAL)}
    >
      <Modal.Content>
        <div className="w-[300px] p-2 py-16 max-xl:px-5 xs:w-[380px] sm:w-[600px] md:w-auto lg:px-20">
          <form
            className="text-start max-md:w-auto md:w-[672px]"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <Input
                type="text"
                {...register("firstName")}
                label="Nome"
                pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                defaultValue={userCurrent.firstName}
              />
              <Input
                type="text"
                {...register("lastName")}
                label="Sobrenome"
                pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                defaultValue={userCurrent.lastName ?? ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                {...register("jobTitle")}
                label="Profissão"
                pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                defaultValue={userCurrent.jobTitle ?? ""}
              />
              <Textarea
                {...register("biography")}
                label="Bio"
                defaultValue={userCurrent.biography ?? ""}
              />
              <Textarea
                {...register("description")}
                label="Experiência"
                defaultValue={userCurrent.description ?? ""}
              />
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
              <Input
                label="Linkedin"
                {...register("linkedin")}
                placeholder="linkedin.com/in/usuario1"
                defaultValue={userCurrent.linkedin ?? ""}
              />
              <Input
                {...register("github")}
                label="Portifólio/Github"
                placeholder="portfóliousuário.com.br"
                defaultValue={userCurrent.github ?? ""}
              />
              <Input
                type="number"
                max={45}
                min={0}
                {...register("yearsOfExperience")}
                label="Anos experiência"
                required
                defaultValue={
                  userCurrent.yearsOfExperience
                    ? userCurrent.yearsOfExperience.toString()
                    : "0"
                }
              />
              <SelectSkillsInput
                label="Especialização"
                state={[selectedSkills, setSelectedSkills]}
                options={options}
              />
            </div>
            <Button
              type="submit"
              className="mt-7"
              disabled={loading}
              isLoading={loading}
            >
              Salvar
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export default EditProfileModal;
