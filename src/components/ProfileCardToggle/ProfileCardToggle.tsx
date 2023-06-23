import clsx from "clsx";
import { MdPermIdentity, MdMenu } from "react-icons/md";
import {
  ProfileCardToggleProps,
  ProfileProps,
} from "./ProfileCardToggle.types";
import { useFormContext } from "react-hook-form";
import { IFormValues } from "SIGNUP_SRC/types";

export const ProfileCard = ({
  active,
  title,
  description,
  Icon,
  onClick,
}: ProfileProps) => {
  return (
    <section
      onClick={onClick}
      className={clsx(
        "p-8 border border-solid border-gray-02 box-border flex flex-col justify-center gap-4 rounded-lg max-w-xs cursor-pointer transition duration-500 ease-linear ",
        active
          ? "border-transparent outline outline-primary-03 outline-4 dark:bg-primary-03"
          : ""
      )}
    >
      {Icon}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-secondary-03 dark:text-neutral-01">
          {title}
        </h1>
        <p className="text-xs text-gray-05 dark:text-neutral-01 line-clamp-3">
          {description}{" "}
        </p>
      </div>
    </section>
  );
};

export const ProfileCardToggle = () => {
  const { setValue, watch } = useFormContext<IFormValues>();

  const isMentor = watch("isMentor");

  return (
    <main className="flex flex-col p-2 sm:flex-row justify-center items-center m-auto gap-8 sm:gap-4">
      <ProfileCard
        onClick={() => setValue("isMentor", false)}
        active={!isMentor}
        title="Quero ser um mentorado"
        description="Aqui você terá acesso à nossa plataforma de mentores,que irão te ajudar na sua carreira profissional"
        Icon={
          <MdPermIdentity
            size={64}
            className={`${
              !isMentor
                ? "text-primary-03 dark:text-neutral-01"
                : "text-gray-02"
            } transition duration-500 ease-in-out`}
          />
        }
      />
      <ProfileCard
        onClick={() => setValue("isMentor", true)}
        active={isMentor}
        title="Quero ajudar
        como mentor"
        description="Nessa opção você entrará
        como mentor e somará
        na trajetória dos mentorados
        que entrarão na plataforma"
        Icon={
          <MdMenu
            size={64}
            className={
              isMentor ? "text-primary-03 dark:text-neutral-01" : "text-gray-02"
            }
          />
        }
      />
    </main>
  );
};
