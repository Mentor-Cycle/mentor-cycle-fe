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
    <div className=" bg-secondary-02 rounded-lg py-4 px-8 xs:py-8 xs:px-12 max-w-[350px] space-y-2">
      <Icon size={32} className="text-neutral-01 mb-2 sm:mb-0" />
      <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-neutral-02">
        {title}
      </h3>
      <p className="text-neutral-05 dark:text-neutral-01">{text}</p>
    </div>
  );
};

export default CardInstructionSection;
