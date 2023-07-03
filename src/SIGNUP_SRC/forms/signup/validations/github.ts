import { z } from "zod";
import * as t from "SIGNUP_SRC/forms/signup/texts";

export const githubSchema = z
  .string()
  .trim()
  .url(t.URL_INVALID)
  .refine((githubUrl) => {
    const validsGithubUrls = ["github.com"];
    const isValidGithubUrl = validsGithubUrls.some((validUrlBody) => {
      return githubUrl.includes(validUrlBody);
    });

    return isValidGithubUrl;
  }, t.URL_INVALID_GITHUB)
  .or(z.literal(""));
