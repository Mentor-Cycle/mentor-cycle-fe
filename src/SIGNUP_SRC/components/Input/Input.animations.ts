import { MotionProps, Transition } from "framer-motion";

export const errorAnimation = (props?: Transition): MotionProps => {
  const { duration = 0.1, ...rest } = props ?? {};
  return {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration, ...rest } },
    exit: { x: -10, opacity: 0, transition: { duration, ...rest } },
  };
};
