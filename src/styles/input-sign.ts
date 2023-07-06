import { twMerge } from "tailwind-merge";

export const stSignGround = "text-secondary-03 bg-neutral-05";

export const stSignBase =
  "min-h-[3rem] rounded-lg outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 border border-gray-02";

export const stSignInput = twMerge(
  stSignGround,
  stSignBase,
  "p-3 placeholder:text-gray-03"
);
