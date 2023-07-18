import Button from "@components/Button";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Props } from "./InfoPopUp.types";

export const InfoPopUp = ({
  description,
  buttonName,
  onButtonClick,
  variant = "primary",
}: Props) => {
  return (
    <div className="mb-8 border border-gray-03 dark:border-neutral-05 flex flex-col md:flex-row justify-between items-center px-8 py-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-center mb-2 sm:mb-0">
        <HiOutlineUserCircle
          size={30}
          className="mr-4 text-gray-05 dark:text-neutral-04 mb-2 sm:mb-0"
        />
        <span className="text-center sm:text-start px-2 my-2 text-sm md:text-base">
          {description}
        </span>
      </div>
      <div className="max-w-[250px] w-full">
        <Button onClick={onButtonClick} size="small" variant={variant}>
          {buttonName}
        </Button>
      </div>
    </div>
  );
};
