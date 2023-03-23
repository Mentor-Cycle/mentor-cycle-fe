import clsx from "clsx";
import { ChipOption } from "./Chip.types";

function Chip({ type }: { type: ChipOption }) {
  const colors: Record<ChipOption, React.ComponentProps<"span">["className"]> =
    {
      [ChipOption.BACKEND]: "text-neutral-02 bg-secondary-02",
      [ChipOption.FRONTEND]: "text-neutral-02 bg-secondary-02",
      [ChipOption.FULLSTACK]: "text-neutral-02 bg-secondary-02",
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
