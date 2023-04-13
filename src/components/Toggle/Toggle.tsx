import clsx from "clsx";
import { ToggleProps } from "./Toggle.types";

const Toggle = ({ isToggle, setIsToggle }: ToggleProps) => {
  return (
    <button
      className="bg-neutral-02 border border-gray-03 h-6 w-12 rounded-xl relative dark:bg-secondary-01 ml-2"
      onClick={() => setIsToggle(!isToggle)}
    >
      <div
        className={clsx(
          "absolute h-5 w-5 rounded-full bg-primary-01 top-[1px] left-[2px] transition-all duration-200 dark:bg-primary-02 ",
          {
            "translate-x-[112%] ": isToggle,
          }
        )}
      ></div>
    </button>
  );
};

export default Toggle;
