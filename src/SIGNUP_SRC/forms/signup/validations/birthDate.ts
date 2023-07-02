import { z } from "zod";
import moment from "moment";
import * as t from "SIGNUP_SRC/forms/signup/texts";

export const birthDateSchema = z
  .string()
  .refine((stringDate) => {
    const hasTypeSomething = !!stringDate.length;
    return hasTypeSomething;
  }, t.DATE_FILL_PROPERLY)
  .refine((stringDate) => {
    const lastChar = "_"; // from mask "__/__/____"
    const totalInputLength = 9;
    const hasNotFilledLastChar = stringDate.split("").at(totalInputLength) === lastChar;
    return !hasNotFilledLastChar;
  }, t.DATE_FILL_PROPERLY)
  .refine((stringDate) => {
    const dateInput = moment(stringDate, "DD/MM/YYYY");
    const isDateValid = dateInput.isValid();
    return isDateValid;
  }, t.DATE_INSERT_VALID)
  .refine((stringDate) => {
    const dateInput = moment(stringDate, "DD/MM/YYYY");
    const now = moment();
    const isDateInputBeforeNow = dateInput.isBefore(now);
    return isDateInputBeforeNow;
  }, t.DATE_BEFORE_NOW)
  .refine((stringDate) => {
    const dateInput = moment(stringDate, "DD/MM/YYYY");
    const date18YearsAgo = moment().subtract(18, "years");
    const isDateInputBeforeDate18YearsAgo = dateInput.isBefore(date18YearsAgo);
    return isDateInputBeforeDate18YearsAgo;
  }, t.DATE_USER_TOO_YOUNG)
  .refine((stringDate) => {
    const dateInput = moment(stringDate, "DD/MM/YYYY");
    const dateMaxTimeAgo = moment().subtract(150, "years");
    const isDateInputAfterDateMaxTimeAgo = dateInput.isAfter(dateMaxTimeAgo);
    return isDateInputAfterDateMaxTimeAgo;
  }, t.DATE_USER_TOO_OLD);
