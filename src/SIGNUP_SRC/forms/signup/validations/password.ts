import { userSchema } from "schemas";
import * as t from "SIGNUP_SRC/forms/signup/texts";

export const passwordSchema = userSchema.shape.password
  .nonempty(t.FILL_FIELD)
  .min(6, t.PASSWORD_TOO_SHORT)
  .max(100, t.PASSWORD_TOO_LONG)
  .refine((password) => {
    const regex = new RegExp("\\d");
    return regex.test(password);
  }, t.PASSWORD_MUST_CONTAIN_NUMBER)
  .refine((password) => {
    const regex = new RegExp("[A-Z]");
    return regex.test(password);
  }, t.PASSWORD_MUST_CONTAIN_UPPERCASE_LETTER)
  .refine((password) => {
    const regex = new RegExp("[a-z]");
    return regex.test(password);
  }, t.PASSWORD_MUST_CONTAIN_LOWERCASE_LETTER)
  .refine((password) => {
    const regex = new RegExp("[^\\w\\s]");
    return regex.test(password);
  }, t.PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER)
  .refine((password) => {
    const regex = new RegExp("^[^\\s]*$");
    return regex.test(password);
  }, t.PASSWORD_MUST_NOT_CONTAIN_SPACES);
