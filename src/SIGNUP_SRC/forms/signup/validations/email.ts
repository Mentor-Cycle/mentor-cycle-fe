import * as t from "SIGNUP_SRC/forms/signup/texts";
import { concat } from "utils/concat";
import { getEmailDomain } from "utils/email/getEmailDomain";
import { getEmailTopLevelDomain } from "utils/email/getEmailTopLevelDomain";
import { getEmailUsername } from "utils/email/getEmailUsername";
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .nonempty(t.FILL_FIELD)
  .email(t.EMAIL_INVALID)
  .refine((email) => {
    const emailUsername = getEmailUsername(email);
    const hasValidEmailUsername = emailUsername.length > 4 && emailUsername.length < 30;
    return hasValidEmailUsername;
  }, concat(t.EMAIL_INVALID, t.EMAIL_INVALID_USERNAME))
  .refine((email) => {
    const emailDomain = getEmailDomain(email);
    const hasValidEmailDomain = emailDomain.length > 2 && emailDomain.length < 15;
    return hasValidEmailDomain;
  }, concat(t.EMAIL_INVALID, t.EMAIL_INVALID_DOMAIN))
  .refine((email) => {
    const emailTopLevelDomain = getEmailTopLevelDomain(email);
    const hasValidTopLevelDomain =
      emailTopLevelDomain.length > 2 && emailTopLevelDomain.length < 10;
    return hasValidTopLevelDomain;
  }, concat(t.EMAIL_INVALID, t.EMAIL_INVALID_TOP_LEVEL_DOMAIN));
