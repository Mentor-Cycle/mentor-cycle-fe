import clsx from "clsx";
import React, { ReactElement } from "react";
import { ButtonProps, ButtonWithIcon, IconProps } from "./Button.types";

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "regular",
      children,
      disabled,
      className,
      isLoading,
      ...props
    },
    ref
  ) => {
    const baseClasses = `flex items-center gap-3 justify-center
      dark:bg-secondary-04
      dark:text-neutral-02
      rounded-lg transition-all
      shadow-md
      border-2 border-primary-02
      hover:border-primary-01
      active:border-primary-04
      disabled:border-gray-02  disabled:cursor-not-allowed dark:disabled:bg-gray-03
      dark:disabled:text-neutral-03 dark:disabled:border-neutral-03`;

    const sizeClasses = {
      regular: `p-4 text-xl gap-4 font-bold w-full`,
      small: `p-3 text-base font-semibold gap-3 w-full`,
    };

    const variantClasses = {
      primary: `bg-primary-03
        text-neutral-01
        hover:bg-primary-01 dark:hover:bg-secondary-0
        active:bg-primary-04 dark:active:text-neutral-01 dark:active:bg-secondary-05 dark:active:border-neutral-01
        disabled:bg-gray-02`,
      secondary: `bg-neutral-01
        text-primary-03
        hover:text-primary-01 dark:hover:bg-secondary-01
        active:text-primary-04 dark:active:text-neutral-01 dark:active:bg-secondary-05 dark:active:border-neutral-01
        disabled:bg-neutral-02 disabled:text-gray-02`,
    };
    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        disabled={disabled}
        {...props}
        data-testid="button"
      >
        {isLoading ? <Spinner size={24} /> : children}
      </button>
    );
  }
) as ButtonWithIcon;

const ButtonIcon: React.FC<IconProps> = ({
  icon: Icon,
  size = 24,
  className,
}) => {
  return <Icon size={size} className={className} data-testid="icon" />;
};

interface SpinnerProps {
  size?: number;
  color?: string;
}
const Spinner = ({
  size = 16,
  color = "currentColor",
}: SpinnerProps): ReactElement => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      data-testid="spinner"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};

Button.Icon = ButtonIcon;
export default Button;
