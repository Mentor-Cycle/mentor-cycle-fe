import { Input } from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input/Input.animations";
import { CSSProperties, useId } from "react";

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

      <div
        className="flex flex-col outline-none grow-[var(--grow)] min-w-0 basis-0"
        style={{ "--grow": 1 } as CSSProperties}
      >
        <label htmlFor={descriptionId} className="mb-1 text-sm text-gray-03">
          Descrição:
        </label>

        <Controller
          name="skills"
          control={control}
          render={({ field }) => {
            return (
              <textarea
                tabIndex={20}
                className="p-3 h-[9rem] rounded-lg text-neutral-02 outline-none focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 bg-secondary-04 border border-gray-05"
                {...field}
                placeholder="Uma breve descrição de você..."
                // ref={null}
              />
            );
          }}
        />

        <AnimatePresence initial={false}>
          {errors.description?.message && (
            <motion.p
              className="mt-2 relative text-sm text-red-400 bg-primary-04/50 text-primary-02 p-2 leading-none rounded-lg"
              {...errorAnimation()}
              style={{ color: "rgb(228 61 61)" }}
            >
              {errors.description?.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
