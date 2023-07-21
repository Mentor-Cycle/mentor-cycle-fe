import { InputErrorMessage } from "@components/InputForm/InputErrorMessage";
import { InputLabel } from "@components/InputForm/InputLabel";
import { InputWrapper } from "@components/InputForm/InputWrapper";
import { InputString } from "@components/InputForm/InputString";
import { FormSelect } from "@components/FormSelect";
import { DateInput } from "@components/DateInput";
import { Select as MultiSelect } from "@components/SelectControlled";
import { InputContainer } from "@components/InputForm/InputContainer";
import { InputSkeleton } from "@components/InputForm/InputSkeleton";
import { InputStringAction } from "@components/InputForm/InputStringAction";
import { InputCheckbox } from "@components/InputForm/InputCheckbox";

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
