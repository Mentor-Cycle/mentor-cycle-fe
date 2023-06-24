import { Input } from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input.animations";
import { PatternFormat } from "react-number-format";
import { Select } from "SIGNUP_SRC/components/SelectControlled";

export const Location = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IFormValues>();

  const passwordErrors =
    errors.password?.message ?? errors.repeatPassword?.message;

  return (
    <>
      <div className="flex gap-2">
        <Input
          {...register("country")}
          errorMessage={errors.country?.message}
          label="País:"
          placeholder="Brasil"
          autoFocus
        />
        <Input
          {...register("state")}
          errorMessage={errors.state?.message}
          label="Estado:"
          placeholder="SP"
        />
      </div>
      <div className="flex gap-2">
        <Input
          {...register("city")}
          errorMessage={errors.city?.message}
          label="Cidade:"
          placeholder="Campinas"
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <Input
              asChild
              label="Data de Nascimento:"
              errorMessage={errors.birthDate?.message}
              placeholder="__/__/____"
              defaultValue={field.value}
              onChange={(e) => {
                const newEvent = e.target.value.replace(/\D/g, "");
                field.onChange(newEvent);
              }}
              onBlur={field.onBlur}
            >
              <PatternFormat
                valueIsNumericString
                format="##/##/####"
                mask="_"
              />
            </Input>
          )}
        />
      </div>
      <Input
        asChild
        errorMessage={errors.skills?.message}
        label="Especialização:"
      >
        <Controller
          name="skills"
          control={control}
          render={(props) => {
            return (
              <Select
                options={[
                  "QA",
                  "Devops",
                  "Front-End",
                  "UI/UX Design",
                  "Full-Stack",
                  "Product Design",
                  "Back-End",
                ]}
                tabIndex={20}
                {...props.field}
              />
            );
          }}
        />
      </Input>
    </>
  );
};
