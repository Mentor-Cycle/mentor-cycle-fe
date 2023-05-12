import { useMutation } from "@apollo/client";
import Button from "@components/Button/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import Textarea from "@components/Textarea/Textarea";
import { useUser } from "@hooks/useUser";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { USER_UPDATE_DATA } from "services/apollo/mutations";
import { EditProfileProps } from "./EditProfile.types";
import { validateUndefined } from "utils/nullable/validateUndefined";

const EditProfile = ({
  openEditProfile,
  setOpenEditProfile,
}: EditProfileProps) => {
  const { user, setUser } = useUser();

  const [updateUser, { loading }] = useMutation(USER_UPDATE_DATA);

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
      locale,
      yearsOfExperience: newYearsOfExperience,
    } = Object.fromEntries(formData.entries());

    const newLocale = locale.toString().trim().split(" ");

    try {
      const updatedUser = {
        firstName: newFirstName || firstName,
        email: newEmail || email,
        biography: newBiography || biography,
        lastName: newLastName || lastName,
        description: newDescription || description,
        jobTitle: newJobTitle || jobTitle,
        country: newLocale[0] || country,
        state: newLocale[1] || state,
        yearsOfExperience:
          parseFloat(newYearsOfExperience.toString()) || yearsOfExperience,
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
    } catch (er) {
      toast.error(
        `Não foi possível alterar suas informações verifique se os novos dados estão corretos`
      );
    }
  }

  return (
    <Modal open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <div className="max-xl:px-5 py-16 px-60">
        <form
          className="max-md:w-auto w-[672px] text-start"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 w-full">
            <Input
              type="text"
              name="firstName"
              label="Nome"
              defaultValue={firstName}
            />
            <Input
              type="text"
              name="lastName"
              label="Sobrenome"
              defaultValue={lastName}
            />
          </div>
          <Input
            type="text"
            name="jobTitle"
            label="Profissão"
            defaultValue={jobTitle}
          />
          <Textarea name="biography" label="Bio" defaultValue={biography} />
          <Textarea
            name="description"
            label="Experiência"
            defaultValue={description}
          />
          <Input
            required
            type="email"
            name="email"
            label="Email"
            defaultValue={email}
          />
          <Input
            type="text"
            name="locale"
            label="País/Estado"
            defaultValue={`${validateUndefined(country)} ${validateUndefined(
              state
            )}`}
          />
          <Input
            type="number"
            max={45}
            min={0}
            name="yearsOfExperience"
            label="Anos experiência"
            defaultValue={
              yearsOfExperience ? yearsOfExperience.toString() : "0"
            }
          />
          <Button className="mt-7" disabled={loading} isLoading={loading}>
            Salvar
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfile;
