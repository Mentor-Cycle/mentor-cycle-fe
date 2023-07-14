import { twMerge } from "tailwind-merge";

// export const stSignGround = "text-secon bg-back-ground";
export const stSignGround = twMerge(
  "text-secondary-05 bg-neutral-03 hover:bg-neutral-01",
  "dark:text-neutral-01 dark:bg-secondary-03"
  // "dark:text-neutral-01 dark:bg-secondary-03 dark:hover:bg-secondary-01",
);

export const stSignBase =
  "min-h-[3rem] rounded-lg outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 border border-gray-03";

export const stSignInput = twMerge(
  stSignGround,
  stSignBase,
  "p-3 placeholder:text-gray-03",
  "p-3 dark:placeholder:text-gray-03"
);
