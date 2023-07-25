import { useTypedQuery } from "@hooks/useTypedQuery";
import { logError } from "utils/logError";
import { SkillsFactoryMethods } from "factories/useSkillsFactory/types";
import { useId } from "react";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { IFormValues } from "providers/signup/register/types";
import { UseFormReturn } from "react-hook-form";

export function useSkillsFactory(
  useFormMethods: UseFormReturn<IFormValues>
): SkillsFactoryMethods {
  const { formState } = useFormMethods;
  const { errors: fsErrors } = formState;
  const errors = fsErrors.skills?.message;

  const { data: skillsResponse, error, loading } = useTypedQuery(api.GET_SKILLS);
  logError({ "Modal/EditProfile/EditProfileModal.tsx": error });

  const inputId = useId();
  const options = skillsResponse?.findAllSkills?.map((skill) => skill.name) ?? [];

  return {
    options,
    inputId,
    errors,
    isLoading: loading,
  };
}
