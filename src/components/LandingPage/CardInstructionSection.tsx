import { IconType } from "react-icons";

type CardType = {
  icon: IconType;
  text: string;
  title: string;
};

const CardInstructionSection: React.FC<CardType> = ({
  icon: Icon,
  text,
  title,
}) => {
  return (
    <div className=" bg-secondary-02 rounded-lg px-14 py-12 max-w-[350px]">
      <Icon size={32} className="text-neutral-01" />
      <h3 className="font-bold text-4.5xl text-neutral-02">{title}</h3>
      <p className="text-neutral-05 dark:text-neutral-01">{text}</p>
    </div>
  );
};

export default CardInstructionSection;
