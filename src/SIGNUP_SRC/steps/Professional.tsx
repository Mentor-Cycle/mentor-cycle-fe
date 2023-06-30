import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import { useId } from "react";
import { Input } from "SIGNUP_SRC/components/Input";
import { Form } from "SIGNUP_SRC/components/Form";

export const Professional = () => {
  const descriptionId = useId();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IFormValues>();

  return (
    <>
      <Input.String
        {...register("linkedin")}
        errorMessage={errors.linkedin?.message}
        label="Linkedin:"
        placeholder="https://example.com"
        autoFocus
      />
      <Input.String
        {...register("github")}
        errorMessage={errors.github?.message}
        label="Github:"
        placeholder="https://example.com"
      />

      <Input.Root grow={1}>
        <Input.Label label="Descrição:" htmlFor={descriptionId} required />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id={descriptionId}
              tabIndex={20}
              className="p-3 h-[9rem] rounded-lg text-neutral-02 outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 bg-secondary-04 border border-gray-05"
              placeholder="Uma breve descrição de você..."
              {...field}
            />
          )}
        />
        <Input.Error errorMessage={errors.description?.message} />
      </Input.Root>
    </>
  );
};
