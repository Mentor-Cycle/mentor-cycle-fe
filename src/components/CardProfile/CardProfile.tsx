import Button from "@components/Button";
import Chip from "@components/Chip";
import clsx from "clsx";
import Image from "next/image";
import { CardProps } from "./CardProfile.types";
import { useRouter } from "next/router";

const CardProfile = ({
  id,
  chips,
  description,
  image,
  jobTitle,
  location,
  name,
}: CardProps) => {
  const MAX_WIDTH = "max-w-[365px]";
  const MIN_WIDTH = "min-w-[300px]";
  const router = useRouter();

  const handleViewProfileClick = () => {
    router.push(`/mentors/${id}`);
  };
  return (
    <div
      className={clsx(
        MAX_WIDTH,
        MIN_WIDTH,
        "px-11 py-6 border w-full border-gray-03 rounded-lg shadow-sm shadow-gray-03 hover:opacity-90 transition-all"
      )}
    >
      <div>
        <Image
          src={image}
          width="100"
          height="100"
          alt="profile"
          className="rounded-lg w-22 h-22 object-cover object-center"
        />
        <h2 className="text-2xl font-bold mt-4 text-secondary-01 truncate dark:text-neutral-01">
          {name}
        </h2>
        <h3 className="font-semibold text-gray-04 mt-2 h-6 truncate dark:text-neutral-04">
          {jobTitle}
        </h3>
        <span className="text-xs text-gray-03 dark:text-neutral-03">
          {location}
        </span>
      </div>
      <div className="flex gap-2 mt-2 rounded-lg overflow-hidden">
        {chips?.map((chip, index) => {
          return <Chip key={`${index}-chip-${index}`}>{chip}</Chip>;
        })}
      </div>

      <div className="mt-8">
        <p className="text-gray-05 dark:text-neutral-05 mb-8 h-24 overflow-ellipsis overflow-hidden ...">
          {description}
        </p>
        <Button
          size="small"
          onClick={handleViewProfileClick}
          className="dark:bg-primary-03"
        >
          Ver Perfil
        </Button>
      </div>
    </div>
  );
};
export default CardProfile;
