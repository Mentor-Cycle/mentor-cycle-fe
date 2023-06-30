import React, { HTMLAttributes } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input/Input.animations";
import { twMerge } from "tailwind-merge";

interface InputErrorMessageProps
  extends Pick<HTMLAttributes<HTMLParagraphElement>, "className">,
    MotionProps {
  errorMessage?: string | undefined;
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
            "mt-2 relative text-sm text-red-400 bg-primary-04/50 text-primary-02 p-2 leading-none rounded-lg",
            rest.className
          )}
          style={{
            color: "#E43D3D", // primary-02
            ..._st,
          }}
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
