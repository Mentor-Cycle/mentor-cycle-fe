import clsx from "clsx";
import { ChipOption } from "./Chip.types";

function Chip({ type }: { type: ChipOption }) {
  const colors: Record<ChipOption, React.ComponentProps<"span">["className"]> =
    {
      [ChipOption.BACKEND]:
        "text-secondary-03 bg-gray-01 dark:bg-secondary-01 dark:text-neutral-01",
      [ChipOption.FRONTEND]:
        "text-secondary-03 bg-gray-01 dark:bg-secondary-01 dark:text-neutral-01",
      [ChipOption.FULLSTACK]:
        "text-secondary-03 bg-gray-01 dark:bg-secondary-01 dark:text-neutral-01",
      [ChipOption.MENTORANDO]: "text-secondary-05 bg-primary-01",
      [ChipOption.MENTORADO]: "text-neutral-01 bg-primary-05",
    };
  return (
    <span className={clsx("px-4 py-1 rounded-2xl text-xxs", colors[type])}>
      {type}
    </span>
  );
}

export default Chip;
