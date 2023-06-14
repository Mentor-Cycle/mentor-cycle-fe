import clsx from "clsx";
import { maskEmail } from "utils/email/maskEmail";
import { Props } from "./InfoCard.types";

export const InfoCard = ({
  title,
  label,
  content,
  contentToValidate,
  alignRight,
}: Props) => {
  return (
    <article className={clsx("w-2/5", alignRight && "ml-0 lg:ml-auto")}>
      <h2 className="text-lg font-bold leading-normal text-secondary-02">
        {title}
      </h2>
      <span
        className={`w-2/5 text-secondary-05 dark:text-neutral-03 ${
          contentToValidate || content ? "" : "text-gray-05 text-base"
        }`}
      >
        {title.includes("mail") ? maskEmail(content) : content || label}
      </span>
    </article>
  );
};
