import { MotionProps, Transition } from "framer-motion";

export const skeletonDefaultAnimation = (props?: Transition): MotionProps => {
  const { duration = 1, ...rest } = props ?? {};

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
      ...rest,
    },
  };
};
