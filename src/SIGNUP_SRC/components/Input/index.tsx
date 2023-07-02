import { InputErrorMessage } from "SIGNUP_SRC/components/Input/InputErrorMessage";
import { InputLabel } from "SIGNUP_SRC/components/Input/InputLabel";
import { InputWrapper } from "SIGNUP_SRC/components/Input/InputWrapper";
import { InputString } from "SIGNUP_SRC/components/Input/InputString";
import { FormSelect } from "SIGNUP_SRC/steps/components/FormSelect";
import { DateInput } from "SIGNUP_SRC/steps/components/DateInput";
import { Select as MultiSelect } from "SIGNUP_SRC/components/SelectControlled";
import { InputContainer } from "SIGNUP_SRC/components/Input/InputContainer";
import { InputSkeleton } from "SIGNUP_SRC/components/Input/InputSkeleton";
import { InputStringAction } from "SIGNUP_SRC/components/Input/InputStringAction";
import { InputCheckbox } from "SIGNUP_SRC/components/Input/InputCheckbox";

export const Input = {
  Error: InputErrorMessage,
  Label: InputLabel,
  Root: InputWrapper,
  String: InputString,
  StringAction: InputStringAction,
  Select: FormSelect,
  Date: DateInput,
  MultiSelect: MultiSelect,
  Container: InputContainer,
  Skeleton: InputSkeleton,
  Checkbox: InputCheckbox,
};
