import clsx from "clsx";
import { ChipProps } from "./Chip.types";

const Chip = ({
  variant = "quartenary",
  children,
  className,
  size,
  onClick,
  ...props
}: ChipProps) => {
  const variantClasses = {
    primary: `bg-neutral-02 text-secondary-01 dark:bg-neutral-02 dark:text-secondary-01  `,
    primary_dark: `text-neutral-01 bg-gray-03 dark:bg-secondary-01 dark:text-neutral-01  `,
    secondary: `bg-primary-02 text-neutral-01 text-xs`,
    secondary_dark: `text-neutral-01 bg-primary-03 `,
    tertiary: `text-neutral-01 bg-primary-05 `,
    quartenary: `text-gray-04 bg-gray-02 dark:text-neutral-02 dark:bg-gray-04`,
    outlined: `text-secondary-03 bg-transparent border border-secondary-03`,
    chipCards: `dark:bg-secondary-01 dark:text-neutral-02 bg-secondary-02 text-neutral-02`,
    chipCardsMentors: `dark:bg-secondary-01 dark:text-neutral-01 bg-secondary-01 text-neutral-01`,
  };
  return (
    <span
      className={clsx(
        "px-4 py-1 max-h-[24px] rounded-2xl flex justify-center items-center text-xxs max-w-[100px] truncate",
        size === "small" ? "min-w-[56px] max-w-[56px]" : "w-auto",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

export default Chip;
