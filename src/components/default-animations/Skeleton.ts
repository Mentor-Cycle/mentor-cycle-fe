import { MotionProps } from "framer-motion";

export const skeletonDefaultAnimation = (props?: { duration: number }): MotionProps => {
  const { duration = 1 } = props ?? {};

  return {
    animate: {
      backgroundColor: ["var(--back-ground)", "var(--back-shadow)"],
    },
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      duration,
    },
  };
};
