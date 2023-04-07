import Chip from "../Chip";
import React from "react";
import { Props } from "./MentoringWeekCard.types";

const MentoringWeekCard = ({
  day,
  description,
  status = "A confirmar",
  hour,
}: Props) => {
  return (
    <div className="max-w-xs p-6 border border-gray-03 rounded-lg">
      <h2 className="font-bold text-2xl text-secondary-01">{day}</h2>
      <p className="text-sm text-gray-04 mt-2 line-clamp-2">{description}</p>
      <div className="flex mt-2 gap-2">
        <Chip variant="primary">{status}</Chip>
        <Chip variant="secondary">{hour}</Chip>
      </div>
    </div>
  );
};

export default MentoringWeekCard;
