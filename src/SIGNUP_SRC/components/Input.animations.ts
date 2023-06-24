export const errorAnimation = () => ({
  initial: { y: -10, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.1 } },
  exit: { x: -10, opacity: 0, transition: { duration: 0.1 } },
});
