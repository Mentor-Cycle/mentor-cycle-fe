import clsx from "clsx";
import Image from "next/image";
import Chip from "@components/Chip";
import { Button } from "@components/Button/Button";
import { CardProps } from "./CardProfile.types";

const CardProfile = ({
  chips,
  description,
  image,
  jobTitle,
  location,
  name,
}: CardProps) => {
  const MAX_WIDTH = "max-w-[365px]";

  return (
    <div
      className={clsx(
        MAX_WIDTH,
        "px-11 py-6  border border-gray-03 rounded-lg shadow-sm shadow-gray-03 hover:opacity-90 transition-all"
      )}
    >
      <div>
        <Image
          src={image}
          width="100"
          height="100"
          alt="profile"
          className="rounded-lg w-20 h-20 object-cover object-center"
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
      <div className="flex gap-2 mt-2">
        {chips.map((chip, index) => (
          <Chip key={`${name}-chip-${index}`} type={chip} />
        ))}
      </div>
      <div className="mt-8">
        <p className="text-gray-05 dark:text-neutral-05 mb-8 h-24 overflow-ellipsis overflow-hidden ...">
          {description}
        </p>
        <Button className="dark:bg-primary-03" size="small">
          Ver Perfil
        </Button>
      </div>
    </div>
  );
};
export default CardProfile;
