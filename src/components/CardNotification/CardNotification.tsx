import Image from "next/image";

import clsx from "clsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CardNotificationProps } from "./CardNotification.types";

const CardNotification = ({
  imgUrl,
  name,
  description,
  alreadyViewed = false,
}: CardNotificationProps) => {
  return (
    <div
      data-testid="teste"
      className={clsx("bg-primary-01 rounded-lg px-4 py-5 flex w-full ", {
        " bg-transparent border border-gray-03 ": alreadyViewed,
      })}
    >
      <Image src={imgUrl} alt="" width={48} height={48} />
      <div
        className={clsx("flex flex-col ml-4  ", {
          " text-gray-04": alreadyViewed,
          "text-neutral-01": !alreadyViewed,
        })}
      >
        <span className="self-start font-bold ">{name}</span>
        <span className="text-sm flex items-center justify-center gap-1 ">
          <AiOutlineArrowRight size={16} />
          {description}
        </span>
      </div>
    </div>
  );
};

export default CardNotification;
