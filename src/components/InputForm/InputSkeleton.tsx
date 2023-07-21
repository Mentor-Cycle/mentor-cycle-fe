import { Input } from "@components/InputForm";
import { skeletonDefaultAnimation } from "@components/default-animations/Skeleton";
import { MotionProps, motion } from "framer-motion";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { OverrideConflict } from "types/overrideConflictTypes";

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
          className={twMerge("text-sm", rest.textClasses, "leading-6")}
          style={{
            color: "var(--fore-subtle)",
          }}
        >
          {children ?? "Carregando..."}
        </p>
      </motion.div>
    </Input.Container>
  );
}
