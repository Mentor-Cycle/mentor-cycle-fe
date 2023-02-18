import clsx from "clsx";
import { ChipOption } from "./Chip.types";

function Chip({ type }: { type: ChipOption }) {
  const colors: Record<ChipOption, React.ComponentProps<"span">["className"]> =
    {
      [ChipOption.BACKEND]: "text-success-01 bg-success-03",
      [ChipOption.FRONTEND]: "text-danger-01 bg-danger-03",
      [ChipOption.FULLSTACK]: "text-info-01 bg-info-03",
    };
  return (
    <span className={clsx("px-2 py-1 rounded-2xl text-xxs", colors[type])}>
      {type}
    </span>
  );
}

export default Chip;
