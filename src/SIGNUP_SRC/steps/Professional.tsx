import {
  Input,
  InputErrorMessage,
  InputLabel,
  InputWrapper,
} from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import { useId } from "react";

export const Professional = () => {
  const descriptionId = useId();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IFormValues>();

  return (
    <>
      <Input
        {...register("linkedin")}
        errorMessage={errors.linkedin?.message}
        label="Linkedin:"
        placeholder="https://example.com"
        autoFocus
      />
      <Input
        {...register("github")}
        errorMessage={errors.github?.message}
        label="Github:"
        placeholder="https://example.com"
      />

      <InputWrapper grow={1}>
        <InputLabel label="Descrição:" htmlFor={descriptionId} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <textarea
                id={descriptionId}
                tabIndex={20}
                className="p-3 h-[9rem] rounded-lg text-neutral-02 outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 bg-secondary-04 border border-gray-05"
                placeholder="Uma breve descrição de você..."
                {...field}
              />
            );
          }}
        />
        <InputErrorMessage errorMessage={errors.description?.message} />
      </InputWrapper>
    </>
  );
};
