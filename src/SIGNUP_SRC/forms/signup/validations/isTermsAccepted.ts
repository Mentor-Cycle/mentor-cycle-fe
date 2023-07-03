import * as t from "SIGNUP_SRC/forms/signup/texts";
import { z } from "zod";

export const isTermsAcceptedSchema = z.boolean().refine(Boolean, t.ACCEPT_TERMS);
