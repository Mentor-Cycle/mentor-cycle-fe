import Button from "@components/Button";
import Chip from "@components/Chip";
import clsx from "clsx";
import Image from "next/image";
import { CardProps } from "./CardProfile.types";
import { useRouter } from "next/router";
import { useState } from "react";

const CardProfile = ({
  id,
  chips,
  description,
  variant = "Large",
  image,
  jobTitle,
  location,
  name,
  isCurrentMentor,
}: CardProps) => {
  const [expandedSkills, setExpandedSkills] = useState(false);

  const handleExpandedSkills = () => {
    setExpandedSkills(!expandedSkills);
  };

  const MAX_WIDTH = "max-w-[365px]";
  const MIN_WIDTH = "min-w-[300px]";
  const router = useRouter();

  const variantSize = {
    Medium: "px-[24px]",
    Large: "px-11 ",
  };

  const handleViewProfileClick = () => {
    router.push(`/mentors/${id}`);
  };
  return (
    <div
      className={clsx(
        MAX_WIDTH,
        MIN_WIDTH,
        variantSize[variant],
        isCurrentMentor && "relative bg-neutral-03 shadow-gray-02 shadow-inner",
        " py-6 border w-full border-gray-03 rounded-lg shadow-sm shadow-gray-03 hover:opacity-90 transition-all"
      )}
    >
      {isCurrentMentor && (
        <div className="absolute right-2 top-2">
          <Chip size="small" variant="quartenary">
            Você
          </Chip>
        </div>
      )}
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
        <h3
          className={clsx(
            jobTitle === "Profissão não fornecida"
              ? "text-gray-01"
              : "text-gray-04",
            "font-semibold mt-2 h-6 truncate dark:text-neutral-04"
          )}
        >
          {jobTitle}
        </h3>
        <span className="text-xs text-gray-03 dark:text-neutral-03">
          {location}
        </span>
      </div>
      <div className="relative">
        <div
          className={clsx(
            "flex gap-2 mt-2 rounded-lg overflow-hidden",
            expandedSkills ? "flex-wrap" : "flex-nowrap"
          )}
        >
          {chips?.map((chip, index) => {
            return <Chip key={`${index}-chip-${index}`}>{chip}</Chip>;
          })}
        </div>
        {chips?.length > 3 && (
          <span
            onClick={handleExpandedSkills}
            className="flex w-full justify-end text-xs mt-2 px-2 absolute hover:opacity-80 hover:cursor-pointer"
          >
            {expandedSkills ? "ver menos..." : "ver mais..."}
          </span>
        )}
      </div>
      <div className="mt-8">
        <p
          className={clsx(
            "text-gray-05 dark:text-neutral-05 mb-8 h-24 overflow-ellipsis overflow-hidden ...",
            expandedSkills && "mb-0"
          )}
        >
          {description}
        </p>
        <Button
          size="small"
          onClick={handleViewProfileClick}
          className={clsx("dark:bg-primary-03", expandedSkills && "mt-0")}
          disabled={isCurrentMentor}
        >
          Ver Perfil
        </Button>
      </div>
    </div>
  );
};
export default CardProfile;
