import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import { IconType } from "react-icons";
import Link from "next/link";

type buttonVariant =
  | "primary"
  | "primarySmall"
  | "secondary"
  | "secondarySmall";

type buttonSize = "regular" | "small";

type iconPositionProps = "left" | "right";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize;
  variant?: buttonVariant;
  children: ReactNode;
  iconPosition?: iconPositionProps;
  icon?: IconType;
  href: string;
  nextLinkProps?: React.ComponentProps<typeof Link>;
}

export const Button = ({
  href,
  variant = "primary",
  size = "regular",
  children,
  iconPosition = "left",
  icon: Icon,
  nextLinkProps,
  ...props
}: Props) => {
  const hasIcon = !!Icon;

  const baseClasses = "h-fit w-fit rounded-lg shadow-md transition-all";

  const sizeClasses = {
    regular: `sm:pt-4 sm:pr-36 sm:pb-4 sm:pl-36 sm:text-xl text-base py-2 gap-4 ${
      hasIcon ? "px-16 pr-10" : "px-16"
    }`,
    small: `py-2 px-16 text-base`,
  };

  const variantClasses = {
    primary:
      "bg-primary-03  text-neutral-01  font-bold border-primary-03 border-2 hover:bg-primary-01 hover:border-primary-01 active:bg-primary-04 active:border-primary-04 disabled:bg-gray-02 disabled:border-gray-02 dark:bg-secondary-04 dark:text-neutral-02 dark:border-neutral-02 dark:hover:bg-secondary-01 dark:active:text-neutral-01 dark:active:bg-secondary-05 dark:active:border-neutral-01 dark:disabled:bg-gray-03 dark:disabled:text-neutral-03 dark:disabled:border-neutral-03",
    primarySmall:
      "bg-primary-03 text-neutral-01  font-semibold border-primary-03 border-2 hover:bg-primary-01 hover:border-primary-01 active:bg-primary-04 active:border-primary-04 disabled:bg-gray-02 disabled:border-gray-02 dark:bg-secondary-04 dark:text-neutral-02 dark:border-neutral-02 dark:disabled:bg-gray-03 dark:disabled:text-neutral-03 dark:disabled:border-neutral-03 ",
    secondary:
      "bg-neutral-01 text-primary-03  font-bold border-2 border-primary-03 hover:border-primary-01 hover:text-primary-01 active:border-primary-04 active:text-primary-04 disabled:bg-neutral-02 disabled:border-gray-02 disabled:text-gray-02 dark:bg-secondary-04 dark:text-neutral-02 dark:border-neutral-02 dark:hover:bg-secondary-01 dark:active:text-neutral-01 dark:active:bg-secondary-05 dark:active:border-neutral-01 dark:disabled:bg-gray-03 dark:disabled:text-neutral-03 dark:disabled:border-neutral-03",
    secondarySmall:
      "bg-neutral-01 text-primary-03  font-semibold border-2 border-primary-03 hover:border-primary-01 hover:text-primary-01 active:border-primary-04 active:text-primary-04 dark:bg-secondary-04 dark:text-neutral-02 dark:border-neutral-02 disabled:bg-neutral-02 disabled:border-gray-02 disabled:text-gray-02 dark:disabled:bg-gray-02 dark:disabled:border-gray-02 dark:disabled:bg-gray-03 dark:disabled:text-neutral-03 dark:disabled:border-neutral-03",
  };

  const iconPositionClass = {
    left: "order-first",
    right: "order-last",
  };

  return (
    <Link href={href} {...nextLinkProps}>
      <button
        className={clsx(
          "flex items-center gap-3 justify-center",
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          iconPositionClass[iconPosition]
        )}
        {...props}
      >
        {iconPosition === "left" && Icon && (
          <Icon size={size === "regular" ? 26 : 21} />
        )}
        {children}
        {iconPosition === "right" && Icon && (
          <Icon size={size === "regular" ? 26 : 21} />
        )}
      </button>
    </Link>
  );
};
