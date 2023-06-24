import { Input } from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { errorAnimation } from "SIGNUP_SRC/components/Input.animations";

export const Personal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>();

  const passwordErrors =
    errors.password?.message ?? errors.repeatPassword?.message;

  return (
    <>
      <div className="flex gap-2">
        <Input
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          label="Nome:"
          placeholder="Guy"
          autoFocus
        />
        <Input
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          label="Sobrenome:"
          placeholder="Hawkins"
        />
      </div>
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        type="email"
        label="E-mail:"
        placeholder="guyhawkins@mail.com"
      />
      <div className="flex gap-2">
        <Input
          {...register("password")}
          type="password"
          label="Senha:"
          placeholder="*********"
        />
        <Input
          {...register("repeatPassword")}
          type="password"
          label="Confirmar senha:"
          placeholder="*********"
        />
      </div>
      <AnimatePresence initial={false}>
        {passwordErrors && (
          <motion.p
            className="mt-2 relative text-sm text-red-400 bg-primary-04/50 text-primary-02 p-2 leading-none rounded-lg"
            {...errorAnimation()}
            style={{ color: "rgb(228 61 61)" }}
          >
            {passwordErrors}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};
