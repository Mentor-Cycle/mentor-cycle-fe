import Image from "next/image";
import Chip from "../../components/Chip";
import clsx from "clsx";
import { useState } from "react";
import { Props, StatusToVariantMap } from "./MentoringLinkCard.types";
import Button from "../../components/Button";
import { OptionStatus } from "schemas/create_event_output";
import { SelectComponent } from "@components/MentoringLinkCard/SelectComponent";
import { eventStatusToPortugueseMap } from "utils/parser/eventStatusToPortuguese";

const MentoringLinkCard = ({
  avatarUrl: avatar,
  name,
  job,
  status,
  date,
  hour,
  meetingLink,
  eventId,
  onCancel,
}: Props) => {
  const [updatedStatus, setUpdatedStatus] = useState<OptionStatus>(status);

  const handleStatusCard = (status: OptionStatus) => {
    const statusToVariantMap: StatusToVariantMap = {
      "Não realizada": "primary",
      Realizada: "secondary",
      "A confirmar": "tertiary",
      Agendada: "chipCards",
      Cancelada: "quartenary",
    };

    const variant = statusToVariantMap[eventStatusToPortugueseMap[status]];
    return <Chip variant={variant}>{eventStatusToPortugueseMap[status]}</Chip>;
  };
  const isDisabled = status === "DONE" || status === "CANCELLED";

  return (
    <div className="py-4 px-6 m-auto flex flex-col md:flex-row justify-between gap-4 max-w-[290px] sm:max-w-7xl  sm:w-full border border-gray-03 rounded-lg">
      <div className="flex flex-col sm:flex sm:flex-row gap-4 ">
        <div className="rounded-lg overflow-hidden w-24 h-24">
          <Image
            src={avatar || "/imgCard.png"}
            alt="avatar profile"
            width={98}
            height={98}
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-01 dark:text-neutral-01 max-w-[320px] truncate">
            {name}
          </h1>
          <p className="text-sm text-gray-04 dark:text-gray-01 max-w-[280px] truncate">
            {job}
          </p>
          <div className="flex gap-2 mt-4 max-w-[260px] truncate">
            {handleStatusCard(updatedStatus)}
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:w-full lg:max-w-xs items-end flex-col sm:flex-row md:flex-col">
        <a
          href={meetingLink}
          className="w-full sm:max-w-sm md:max-w-lg m-auto"
          rel="noreferrer"
          target="_blank"
        >
          <Button disabled={isDisabled} size="small">
            {isDisabled ? "Chamada Encerrada" : "Acessar chamada"}
          </Button>
        </a>
        <div className="flex items-center justify-end w-full sm:max-w-sm">
          <div className="flex flex-col justify-end items-end mr-3">
            <span className="mt-4 dark:text-neutral-03">{date}</span>
            <span className="text-gray-03 dark:text-neutral-05">{hour}</span>
          </div>

          <div
            className={clsx(
              "relative cursor-pointer transition-all duration-300",
              ["DONE", "CANCELLED"].includes(status) && "invisible"
            )}
          >
            <SelectComponent
              eventId={eventId}
              status={updatedStatus}
              onCancel={onCancel}
              disabled={status === "DONE" || status === "CANCELLED"}
              setStatus={setUpdatedStatus}
              name={name}
              hour={hour}
              date={date}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoringLinkCard;
