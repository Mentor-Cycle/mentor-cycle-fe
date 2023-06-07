import { useMutation, useQuery } from "@apollo/client";
import Button from "@components/Button/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import Textarea from "@components/Textarea/Textarea";
import { useUser } from "@hooks/useUser";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { USER_UPDATE_DATA } from "services/apollo/mutations";
import { EditProfileProps, IEditProfileFormData } from "./EditProfile.types";
import SelectLocation from "@components/LocationSelector/SelectLocation";
import { SingleValue } from "react-select";
import { Country, State } from "@hooks/useFetch.types";
import { useFetch } from "@hooks/useFetch";
import SkillsEditProfile from "@components/MultiSelect/SkillsEditProfile";
import { MultiSelectOptions } from "@components/MultiSelect/MultiSelect.types";
import { GET_ME, GET_MENTORS, GET_SKILLS } from "services/apollo/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectSkillsInput from "@components/MultiSelect/SelectSkillsInput";
import { GET_SKILLS_querySchema } from "services/apollo/queries/queries.validation";
import { IUserSession } from "types/user.types";
import { useTypedQuery } from "@hooks/useTypedQuery";

interface ILabelValue {
  label: string;
  value: string;
}

const EditProfile = ({
  openEditProfile,
  setOpenEditProfile,
}: EditProfileProps) => {
  const { user: userCurrent, setUser } = useUser();
  const { register, reset, handleSubmit } = useForm<IEditProfileFormData>();

  const { data, isLoading, error } = useTypedQuery("GET_SKILLS");
  const options = data ? data.findAllSkills.map((opt) => opt.name) : [];

  const [updateUser, { loading }] = useMutation(USER_UPDATE_DATA, {
    refetchQueries: [GET_MENTORS, GET_ME],
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<ILabelValue>>(null);
  const [selectedStates, setSelectedStates] =
    useState<SingleValue<ILabelValue>>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { getCountries, getStates } = useFetch();

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

  // async function handleSubmitXXX(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   const formElement = e.target as HTMLFormElement;
  //   const formData = new FormData(formElement);

  //   const {
  //     firstName: newFirstName,
  //     lastName: newLastName,
  //     jobTitle: newJobTitle,
  //     biography: newBiography,
  //     description: newDescription,
  //     email: newEmail,
  //     github: newGithub,
  //     linkedin: newLinkedin,
  //     yearsOfExperience: newYearsOfExperience,
  //   } = Object.fromEntries(formData.entries());

  //   try {
  //     const updatedUser = {
  //       firstName: newFirstName || firstName,
  //       email: newEmail || email,
  //       biography: newBiography || biography,
  //       lastName: newLastName || lastName,
  //       github: newGithub || github,
  //       linkedin: newLinkedin || linkedin,
  //       description: newDescription || description,
  //       jobTitle: newJobTitle || jobTitle,
  //       country: selectedCountry ? selectedCountry.value : country,
  //       state: selectedStates ? selectedStates.label : "",
  //       skills: selectedSkills.map(skill => skill.value),
  //       yearsOfExperience: isNaN(parseFloat(newYearsOfExperience.toString()))
  //         ? yearsOfExperience
  //         : parseFloat(newYearsOfExperience.toString()),
  //       id,
  //     };

  //     const { data } = await updateUser({
  //       variables: updatedUser,
  //     });

  //     if (data) {
  //       // setUser({
  //       //   ...user,
  //       //   ...updatedUser,
  //       // });
  //       toast.success("Alterações realizadas com sucesso!");
  //       setOpenEditProfile(false);
  //     }
  //   } catch (error) {
  //     handleErrors(error);
  //   }
  // }

  const submitHandler: SubmitHandler<IEditProfileFormData> = async (form) => {
    const parsedForm: IEditProfileFormData = {
      ...form,
      yearsOfExperience: Number(form.yearsOfExperience),
    };

    try {
      const updatedUser: IEditProfileFormData = {
        firstName: parsedForm.firstName || userCurrent.firstName,
        email: parsedForm.email || userCurrent.email,
        biography: parsedForm.biography || userCurrent.biography,
        lastName: parsedForm.lastName || userCurrent.lastName,
        github: parsedForm.github || userCurrent.github,
        linkedin: parsedForm.linkedin || userCurrent.linkedin,
        description: parsedForm.description || userCurrent.description,
        jobTitle: parsedForm.jobTitle || userCurrent.jobTitle,
        country: selectedCountry?.label || userCurrent.country,
        state: selectedStates?.label || userCurrent.state,
        skills: selectedSkills || userCurrent.skills,
        yearsOfExperience: parsedForm.yearsOfExperience,
        id: userCurrent.id,
      };

      const { data } = await updateUser({
        variables: updatedUser,
      });

      if (data) {
        setUser({
          ...userCurrent,
          ...updatedUser,
        });
        toast.success("Alterações realizadas com sucesso!");
        setOpenEditProfile(false);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

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

  const handleLocationChange =
    (setState: Dispatch<SetStateAction<SingleValue<ILabelValue>>>) =>
    ({ value, label }: ILabelValue) => {
      setState({ label, value });
    };

  const uniqueSkill = userCurrent.skills
    ? userCurrent.skills.map((skill: string) => ({
        label: skill,
        value: skill,
      }))
    : [];

  return (
    <Modal open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <div className="max-xl:px-5 py-16 w-[300px] xs:w-[380px] sm:w-[600px] md:w-auto p-2 lg:px-20">
        <form
          className="max-md:w-auto md:w-[672px] text-start"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full">
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
            <Input
              required
              type="email"
              {...register("email")}
              label="Email"
              defaultValue={userCurrent.email}
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
    </Modal>
  );
};

export default EditProfile;
