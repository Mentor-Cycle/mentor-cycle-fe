import Image from "next/image";
import { Props } from "./DashboardCardProfile.types";
import Chip from "../Chip";
import clsx from "clsx";

const DashboardCardProfile = ({
  skills = ["Full-Stack", "Back-End", "Front-End"],
  name,
  job,
  avatar,
  className,
}: Props) => {
  return (
    <div className={clsx("pt-4 flex items-center gap-4", className)}>
      <div className="rounded-lg overflow-hidden w-24 h-24">
        <Image
          src={avatar ? avatar : "/imgCard.png"}
          alt="avatar profile"
          width={98}
          height={98}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-neutral-01 max-w-[320px] truncate">
          {name}
        </h1>
        <p className="text-sm text-gray-01 max-w-[280px] truncate">{job}</p>
        <div className="flex gap-2 mt-4 max-w-[275px] truncate">
          {skills.map((skill) => {
            return (
              <Chip key={skill} variant="primary">
                {skill}
              </Chip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardCardProfile;
