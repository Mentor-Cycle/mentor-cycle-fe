import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { CardNotificationProps } from "./CardNotification.types";

import { ImArrowRight2 } from "react-icons/im";
import ThemedImage from "@components/Header/ThemeImage";

const CardNotification = ({
  imgUrl,
  name,
  description,
  alreadyViewed = false,
  setShowModal,
  link,
}: CardNotificationProps) => {
  const handleClick = () => {
    if (setShowModal) setShowModal("");
  };

  return (
    // change approach after automatically add closing modal
    <Link href={"/profile"} onClick={handleClick}>
      <div
        data-testid="teste"
        className={clsx(
          "bg-primary-01 rounded-lg px-4 py-5 flex flex-col sm:flex-row w-full justify-center items-center max-w-xs",
          {
            " bg-transparent border border-gray-03 ": alreadyViewed,
          }
        )}
      >
        <ThemedImage />
        {/* <Image src={imgUrl || "/imgCard.png"} alt="" width={48} height={48} /> */}
        <div
          className={clsx("flex flex-col ml-4 h-full", {
            " text-gray-04": alreadyViewed,
            "text-neutral-01": !alreadyViewed,
          })}
        >
          <span className="self-start font-bold dark:text-neutral-02">
            {name}
          </span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">
              <ImArrowRight2 />
            </span>
            <span className="text-sm truncate max-w-[498px] dark:text-neutral-02">
              {description}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardNotification;
