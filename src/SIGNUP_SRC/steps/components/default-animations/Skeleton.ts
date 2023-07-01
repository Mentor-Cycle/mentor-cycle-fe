import { MotionProps } from "framer-motion";

export const skeletonDefaultAnimation = (props?: { duration: number }): MotionProps => {
  const { duration = 1 } = props ?? {};

  return {
    animate: {
      backgroundColor: [
        "#171818", // secondary 03
        "#343434", // secondary 01
      ],
    },
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      duration,
    },
  };
};
