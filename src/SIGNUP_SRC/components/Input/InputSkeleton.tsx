import { Input } from "SIGNUP_SRC/components/Input";
import { skeletonDefaultAnimation } from "SIGNUP_SRC/steps/components/default-animations/Skeleton";
import { MotionProps } from "framer-motion";
import React, { HTMLAttributes, LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { OverrideConflict } from "types/overrideConflictTypes";
import { motion } from "framer-motion";

interface InputSkeletonProps
  extends OverrideConflict<HTMLAttributes<HTMLDivElement>, MotionProps> {
  animation?: MotionProps;
  textClasses?: string;
  children?: React.ReactNode;
}

export function InputSkeleton({ children, animation, ...rest }: InputSkeletonProps) {
  const animationProps = animation ?? skeletonDefaultAnimation();

  return (
    <Input.Container asChild className={twMerge("skeleton-wave", rest.className)}>
      <motion.div {...rest} {...animationProps}>
        <p
          className={twMerge("leading-6 text-sm", rest.textClasses)}
          style={{
            color: "#989898", // gray-02
          }}
        >
          {children ?? "Carregando..."}
        </p>
      </motion.div>
    </Input.Container>
  );
}
