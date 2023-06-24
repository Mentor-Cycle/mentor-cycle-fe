import React, { CSSProperties, InputHTMLAttributes, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, AnimatePresence } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input.animations";
// import { fm } from "./Input.animations"

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string | undefined;
  asChild?: boolean;
  grow?: number;
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(
  function InputComponent(
    {
      asChild,
      grow = 1,
      type = "text",
      errorMessage,
      label,
      className,
      ...rest
    },
    ref
  ) {
    const inputId = useId();
    const _cn = className ? ` ${className}` : "";
    const Component = asChild ? Slot : "input";

    return (
      <div
        className="flex flex-col outline-none grow-[var(--grow)] min-w-0 basis-0"
        style={{ "--grow": grow } as CSSProperties}
      >
        {label && (
          <label htmlFor={inputId} className="mb-1 text-sm text-gray-03">
            {label}
          </label>
        )}
        <Component
          id={inputId}
          type={type}
          autoComplete="off"
          tabIndex={20}
          className={
            "my-1 px-3 min-h-[3rem] rounded-lg text-neutral-02 outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 bg-secondary-04 border border-gray-05" +
            _cn
          }
          ref={ref}
          {...rest}
        />
        <AnimatePresence initial={false}>
          {errorMessage && (
            <motion.p
              className="mt-2 relative text-sm text-red-400 bg-primary-04/50 text-primary-02 p-2 leading-none rounded-lg"
              {...errorAnimation()}
              style={{ color: "rgb(228 61 61)" }}
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
