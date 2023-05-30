import Button from "@components/Button";
import { useUser } from "@hooks/useUser";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi";

type Props = {};

const ProfileCompletionAlert = (props: Props) => {
  const { user } = useUser();

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
        <div className="mb-[72px] border border-gray-03 dark:border-neutral-05 flex flex-col md:flex-row justify-between items-center px-8 py-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center mb-2 sm:mb-0">
            <HiOutlineUserCircle
              size={30}
              className="mr-4 text-gray-05 dark:text-neutral-04 mb-2 sm:mb-0"
            />
            <span className="text-center sm:text-start px-2 my-2 text-sm md:text-base">
              Complete seu perfil e deixe ele mais interessante
            </span>
          </div>
          <div className="max-w-[250px] w-full">
            <Link href={"/profile"}>
              <Button size="small" variant="profileCompletion">
                Completar perfil
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileCompletionAlert;
