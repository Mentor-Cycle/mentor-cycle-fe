import { z } from "zod";
import * as t from "SIGNUP_SRC/forms/signup/texts";

export const linkedinSchema = z
  .string()
  .trim()
  .url(t.URL_INVALID)
  .refine((linkedinUrl) => {
    const validsLinkedinUrls = ["linkedin.com", "lnkd.in"];
    const isValidLinkedinUrl = validsLinkedinUrls.some((validUrlBody) => {
      return linkedinUrl.includes(validUrlBody);
    });

    return isValidLinkedinUrl;
  }, t.URL_INVALID_LINKEDIN)
  .or(z.literal(""));
