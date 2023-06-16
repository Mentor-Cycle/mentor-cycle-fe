import Image from "next/image";
import { Props } from "./DashboardCardProfile.types";
import Chip from "../Chip";
import clsx from "clsx";

const DashboardCardProfile = ({
  skills,
  name,
  job,
  avatarUrl,
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        "py-4 flex flex-col justify-start  sm:flex sm:flex-row sm:justify-center gap-4",
        className
      )}
    >
      <div className="rounded-lg overflow-hidden w-24 h-24">
        <Image
          src={avatarUrl || "/imgCard.png"}
          alt="avatar profile"
          width={98}
          height={98}
        />
      </div>
      <div>
        <h1 className="text-2xl xs:text-3xl font-bold text-neutral-01 max-w-[300px] truncate">
          {name}
        </h1>
        <p className="text-sm text-gray-01 max-w-[280px] truncate">{job}</p>
        <div className="flex gap-2 mt-4 max-w-[300px] flex-wrap">
          {skills?.map((skill) => {
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
