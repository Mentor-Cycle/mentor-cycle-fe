import Image from "next/image";

import clsx from "clsx";
import Link from "next/link";
import { CardNotificationProps } from "./CardNotification.types";

import { ImArrowRight2 } from "react-icons/im";

const CardNotification = ({
  imgUrl,
  name,
  description,
  alreadyViewed = false,
}: CardNotificationProps) => {
  return (
    <Link href="">
      <div
        data-testid="teste"
        className={clsx(
          "bg-primary-01 rounded-lg px-4 py-5 flex w-full max-w-[634px] h-22 ",
          {
            " bg-transparent border border-gray-03 ": alreadyViewed,
          }
        )}
      >
        <Image src={imgUrl} alt="" width={48} height={48} />
        <div
          className={clsx("flex flex-col ml-4 h-full", {
            " text-gray-04": alreadyViewed,
            "text-neutral-01": !alreadyViewed,
          })}
        >
          <span className="self-start font-bold ">{name}</span>
          <div className="flex items-center gap-4">
            <span>
              <ImArrowRight2 />
            </span>
            <span className=" text-sm truncate max-w-[498px]">
              {description}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardNotification;
