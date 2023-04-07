import Image from "next/image";
import imgCard from "../../public/imgCard.png";
import { Props } from "./DashboardCardProfile.types";
import Chip from "../Chip";

const DashboardCardProfile = ({
  skills = ["Full-Stack", "Back-End", "Front-End"],
  name,
  job,
  avatar,
}: Props) => {
  return (
    <div className="p-4 flex justify-center items-center gap-4">
      <div className="rounded-lg overflow-hidden w-24 h-24">
        <Image
          src={avatar ? avatar : imgCard}
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
        <div className="flex gap-2 mt-4 max-w-[260px] truncate">
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
