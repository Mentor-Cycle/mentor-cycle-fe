import { useMutation } from "@apollo/client";
import Button from "@components/Button/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import Textarea from "@components/Textarea/Textarea";
import { useUser } from "@hooks/useUser";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { USER_UPDATE_DATA } from "services/apollo/mutations";
import { EditProfileProps } from "./EditProfile.types";
import SelectLocation from "@components/LocationSelector/SelectLocation";
import { SingleValue } from "react-select";
import { Country, State } from "@hooks/useFetch.types";
import { useFetch } from "@hooks/useFetch";
import SkillsEditProfile from "@components/MultiSelect/SkillsEditProfile";
import { MultiSelectOptions } from "@components/MultiSelect/MultiSelect.types";
import { GET_ME, GET_MENTORS } from "services/apollo/queries";

const EditProfile = ({
  openEditProfile,
  setOpenEditProfile,
}: EditProfileProps) => {
  const { user, setUser } = useUser();

  const [updateUser, { loading }] = useMutation(USER_UPDATE_DATA, {
    refetchQueries: [GET_MENTORS, GET_ME],
  });
  const [selectedSkills, setSelectedSkills] = useState<MultiSelectOptions>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<{ label: string; value: string }>>(null);
  const [selectedStates, setSelectedStates] =
    useState<SingleValue<{ label: string; value: string }>>(null);
  const { getCountries, getStates } = useFetch();

  useEffect(() => {
    if (user.skills) {
      setSelectedSkills(
        user.skills.map((skill: string) => ({
          label: skill,
          value: skill,
        }))
      );
    }
  }, [user.skills]);

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await getCountries();
      setCountries(fetchedCountries);
    };
    const fetchStates = async () => {
      if (selectedCountry?.value === "Brasil") {
        const fetchedStates = await getStates();
        setStates(fetchedStates);
      } else {
        setSelectedStates(null);
      }
    };
    fetchCountries();
    fetchStates();
  }, [getCountries, getStates, selectedCountry]);

  const {
    firstName,
    lastName,
    email,
    id,
    biography,
    yearsOfExperience,
    jobTitle,
    country,
    github,
    linkedin,
    state,
    description,
  } = user;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const {
      firstName: newFirstName,
      lastName: newLastName,
      jobTitle: newJobTitle,
      biography: newBiography,
      description: newDescription,
      email: newEmail,
      github: newGithub,
      linkedin: newLinkedin,
      yearsOfExperience: newYearsOfExperience,
    } = Object.fromEntries(formData.entries());

    try {
      const updatedUser = {
        firstName: newFirstName || firstName,
        email: newEmail || email,
        biography: newBiography || biography,
        lastName: newLastName || lastName,
        github: newGithub || github,
        linkedin: newLinkedin || linkedin,
        description: newDescription || description,
        jobTitle: newJobTitle || jobTitle,
        country: selectedCountry ? selectedCountry.value : country,
        state: selectedStates ? selectedStates.label : "",
        skills: selectedSkills.map((skill) => skill.value),
        yearsOfExperience: isNaN(parseFloat(newYearsOfExperience.toString()))
          ? yearsOfExperience
          : parseFloat(newYearsOfExperience.toString()),

        id,
      };

      const { data } = await updateUser({
        variables: updatedUser,
      });

      if (data) {
        setUser({
          ...user,
          ...updatedUser,
        });
        toast.success("Alterações realizadas com sucesso!");
        setOpenEditProfile(false);
      }
    } catch (error) {
      handleErrors(error);
    }
  }

  const handleErrors = (error: any) => {
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

  const handleCountryChange = (
    name: string,
    newValue: SingleValue<{ label: string; value: string }>
  ) => {
    setSelectedCountry(newValue);
  };
  const handleStatesChange = (
    name: string,
    newValue: SingleValue<{ label: string; value: string }>
  ) => {
    setSelectedStates(newValue);
  };

  const handleSelectedSkills = (skills: MultiSelectOptions) => {
    setSelectedSkills(skills);
  };

  return (
    <Modal open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <div className="max-xl:px-5 py-16 w-[300px] xs:w-[380px] sm:w-[600px] md:w-auto p-2 lg:px-20">
        <form
          className="max-md:w-auto md:w-[672px] text-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <Input
              type="text"
              name="firstName"
              label="Nome"
              pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
              defaultValue={firstName}
            />
            <Input
              type="text"
              name="lastName"
              label="Sobrenome"
              pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
              defaultValue={lastName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              name="jobTitle"
              label="Profissão"
              pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
              defaultValue={jobTitle}
            />
            <Textarea name="biography" label="Bio" defaultValue={biography} />
            <Textarea
              name="description"
              label="Experiência"
              defaultValue={description}
            />
            <SelectLocation
              onSelect={(
                newValue: SingleValue<{
                  label: string;
                  value: string;
                }>
              ) => handleCountryChange("country", newValue)}
              label="Pais"
              requiredField={true}
              name="country"
              options={countries}
              placeholder="Selecione um Pais"
              value={selectedCountry || { label: country, value: country }}
            />
            <SelectLocation
              onSelect={(
                newValue: SingleValue<{
                  label: string;
                  value: string;
                }>
              ) => handleStatesChange("state", newValue)}
              label="Estado"
              requiredField={true}
              name="state"
              options={states}
              placeholder="Selecione um Estado"
              value={selectedStates || { label: state, value: state }}
              isDisabled={selectedCountry?.value !== "Brasil"}
            />
            <Input
              name="linkedin"
              label="Linkedin"
              placeholder="linkedin.com/in/usuario1"
              defaultValue={linkedin}
            />
            <Input
              name="github"
              label="Portifólio/Github"
              placeholder="portfóliousuário.com.br"
              defaultValue={github}
            />
            <Input
              type="number"
              max={45}
              min={0}
              name="yearsOfExperience"
              label="Anos experiência"
              required
              defaultValue={
                yearsOfExperience ? yearsOfExperience.toString() : "0"
              }
            />
            <SkillsEditProfile
              label="Especialização"
              onSelectedSkills={handleSelectedSkills}
              uniqueSkill={user.skills.map((skill: string) => ({
                label: skill,
                value: skill,
              }))}
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
    </Modal>
  );
};

export default EditProfile;
