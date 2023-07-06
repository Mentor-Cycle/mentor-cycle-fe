import React, { HTMLAttributes } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input/Input.animations";
import { twMerge } from "tailwind-merge";

interface InputErrorMessageProps
  extends Pick<HTMLAttributes<HTMLParagraphElement>, "className">,
    MotionProps {
  errorMessage?: string;
  shouldAnimate?: boolean;
}

export function InputErrorMessage({
  style,
  errorMessage,
  shouldAnimate,
  ...rest
}: InputErrorMessageProps) {
  const _st = style ?? {};
  const animationProps = shouldAnimate ? errorAnimation() : {};

  return (
    <AnimatePresence initial={false}>
      {errorMessage && (
        <motion.p
          {...rest}
          {...animationProps}
          className={twMerge(
            "mt-2 relative text-sm border border-primary-01 text-primary-02 font-medium p-2 rounded-lg",
            rest.className,
            "dark:bg-primary-01 dark:border-none font-normal"
          )}
          style={{
            color: "#E43D3D", // primary-02
            // color: "#580505", // primary-05
            ..._st,
          }}
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
