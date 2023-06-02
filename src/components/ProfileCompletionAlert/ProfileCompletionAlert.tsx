import { InfoPopUp } from "@components/InfoPopUp";
import { useUser } from "@hooks/useUser";
import { useRouter } from "next/router";

const ProfileCompletionAlert = () => {
  const { user } = useUser();
  const router = useRouter();

  const REQUIRED_FIELDS = [
    "firstName",
    "lastName",
    "photoUrl",
    "biography",
    "description",
    "country",
    "yearsOfExperience",
    "skills",
    "github",
    "linkedin",
    "email",
    "jobTitle",
  ];

  const thereAreFieldsToFill = REQUIRED_FIELDS.some((field) => {
    const value = user[field];
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    return !value;
  });

  const isProfileCompleted = !thereAreFieldsToFill;

  return (
    <>
      {!isProfileCompleted ? (
        <InfoPopUp
          description="Complete seu perfil e deixe ele mais interessante"
          buttonName="Completar perfil"
          variant="primary_black"
          onButtonClick={() => {
            router.push("/profile?edit=true");
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileCompletionAlert;
