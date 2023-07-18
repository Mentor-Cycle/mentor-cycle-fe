import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { CardNotificationProps } from "./CardNotification.types";

const CardNotification = ({
  imgUrl,
  name,
  description,
  alreadyViewed = false,
}: CardNotificationProps) => {
  return (
    // change approach after automatically add closing modal
    <div
      data-testid="card"
      className={clsx(
        "bg-primary-01 rounded-lg px-4 py-5 flex flex-col sm:flex-row w-full justify-center items-center ",
        {
          " bg-transparent border border-gray-03 ": alreadyViewed,
        }
      )}
    >
      <Image src={imgUrl || "/imgCard.png"} alt="" width={62} height={56} />
      <div
        className={clsx("flex flex-col ml-4 h-full", {
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
