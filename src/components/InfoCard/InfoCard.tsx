import clsx from "clsx";

export const InfoCard = ({
  title,
  label,
  content,
  contentToValidate,
  alignRight,
}: {
  title: string;
  content: string;
  label: string;
  alignRight?: boolean;
  contentToValidate?: unknown;
}) => {
  return (
    <article className={clsx("w-2/5", alignRight ? "ml-0 lg:ml-auto" : "")}>
      <h2 className="text-base font-bold leading-normal text-secondary-02">
        {title}
      </h2>
      <span
        className={`w-2/5 text-secondary-05 dark:text-neutral-03 ${
          contentToValidate || content ? "" : "text-gray-05 text-base"
        }`}
      >
        {content || label}
      </span>
    </article>
  );
};
