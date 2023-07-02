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
        rootClasses="my-2"
      />
      <Input.String
        {...register("github")}
        errorMessage={errors.github?.message}
        label="Github:"
        placeholder="https://example.com"
        rootClasses="my-2"
      />

      <Input.Root grow={1} className="my-2">
        <Input.Label label="Descrição:" htmlFor={descriptionId} required />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input.Container asChild>
              <textarea
                id={descriptionId}
                tabIndex={20}
                className="input-sign min-h-[50px] h-[150px]"
                placeholder="Uma breve descrição de você..."
                {...field}
              />
            </Input.Container>
          )}
        />
        <Input.Error errorMessage={errors.description?.message} />
      </Input.Root>
    </>
  );
};
