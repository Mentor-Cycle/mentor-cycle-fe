import clsx from "clsx";
import { ChipProps } from "./Chip.types";

const Chip = ({ variant, children }: ChipProps) => {
  const variantClasses = {
    primary: `text-secondary-03 bg-gray-01 dark:bg-secondary-01 dark:text-neutral-01  `,
    secondary: `text-secondary-05 bg-primary-01 `,
    tertiary: `text-neutral-01 bg-primary-05 `,
    quartenary: `text-neutral-01 bg-secondary-02`,
  };
  return (
    <span
      className={clsx(
        "px-4 py-1 rounded-2xl text-xxs",
        variantClasses[variant]
      )}
    >
      {children}
    </span>
  );
};

export default Chip;
