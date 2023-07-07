import { twMerge } from "tailwind-merge";

export const stSignGround = "text-fore-ground-base bg-back-ground";
export const stShadow = "shadow-input";

export const stSignBase =
  "min-h-[3rem] rounded-lg outline-none focus:outline-1 focus:outline-ring-strong focus:outline-offset-2 border border-ring-base";

export const stSignInput = twMerge(
  stShadow,
  stSignGround,
  stSignBase,
  "p-3 placeholder:text-fore-subtle"
);
