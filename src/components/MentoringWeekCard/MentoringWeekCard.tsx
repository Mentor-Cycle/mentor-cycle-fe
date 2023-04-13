import { Props } from "./MentoringWeekCard.types";

const MentoringWeekCard = ({ day, description, chips }: Props) => {
  return (
    <div className="max-w-xs p-6 border border-gray-03 rounded-lg">
      <h2 className="font-bold text-2xl text-secondary-01">{day}</h2>
      <p className="text-sm text-gray-04 mt-2 line-clamp-2">{description}</p>
      <div className="flex mt-2 gap-2">{chips}</div>
    </div>
  );
};

export default MentoringWeekCard;
