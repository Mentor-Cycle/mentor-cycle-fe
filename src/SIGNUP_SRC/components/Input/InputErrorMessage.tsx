import React, { HTMLAttributes } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input/Input.animations";

interface InputErrorMessageProps
  extends Pick<HTMLAttributes<HTMLParagraphElement>, "className">,
    MotionProps {
  errorMessage?: string | undefined;
}

export function InputErrorMessage({
  style,
  className,
  errorMessage,
  ...rest
}: InputErrorMessageProps) {
  const _st = style ?? {};
  const _cn = className ? ` ${className}` : "";

  return (
    <AnimatePresence initial={false}>
      {errorMessage && (
        <motion.p
          className={
            "mt-2 relative text-sm text-red-400 bg-primary-04/50 text-primary-02 p-2 leading-none rounded-lg" +
            _cn
          }
          {...errorAnimation()}
          style={{
            color: "#E43D3D", // primary-02
            ..._st,
          }}
          {...rest}
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
