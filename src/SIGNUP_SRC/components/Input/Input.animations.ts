import { MotionProps, Transition } from "framer-motion";

export const errorAnimation = (props?: {
  duration: number;
  delay: number;
}): MotionProps => {
  const { duration = 0.1, delay } = props ?? {};
  return {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration, delay } },
    exit: { x: -10, opacity: 0, transition: { duration, delay } },
  };
};
