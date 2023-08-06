import clsx from "clsx";
import Image from "next/image";
import { CardNotificationProps } from "./CardNotification.types";

const CardNotification = ({
  imgUrl,
  name,
  description,
  alreadyViewed = false,
}: CardNotificationProps) => {
  return (
    <div
      data-testid="card"
      className={clsx(
        "bg-primary-01 rounded-lg px-4 py-5 flex flex-col sm:flex-row w-full justify-center items-center ",
        {
          " bg-transparent border border-gray-03 ": alreadyViewed,
        }
      )}
    >
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0 sm:mr-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src={imgUrl || "/imgCard.png"}
            alt=""
            layout="responsive"
            width={64}
            height={64}
          />
        </div>
      </div>
      <div
        className={clsx("flex flex-col h-full", {
          " text-gray-04": alreadyViewed,
          "text-neutral-01": !alreadyViewed,
        })}
      >
        <span className="self-start ml-3 font-bold dark:text-neutral-02">
          {name}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm dark:text-neutral-02">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default CardNotification;
