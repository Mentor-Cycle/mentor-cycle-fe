export function createStringRequirements({
  minLength = 8,
  maxLength,
  includeNumber = true,
  includeLowercase = true,
  includeSpecial = true,
  includeUppercase = true,
}: StringRequirementsArgs = {}): RegExp {
  const min = minLength && minLength > 0 ? minLength : 1;
  const max = maxLength && maxLength > min ? maxLength : "";
  return new RegExp(
    `^${patternFormatter("?=.*?[A-Z]", includeUppercase)}${patternFormatter(
      "?=.*?[a-z]",
      includeLowercase
    )}${patternFormatter("?=.*?[0-9]", includeNumber)}${patternFormatter(
      "?=.*?[#?!@$%^&*-]",
      includeSpecial
    )}.{${min},${max}}`
  );
}

export function patternFormatter(
  pattern: string,
  args: IncludeRequirement
): string {
  if (args === false) {
    return "";
  }

  if (args === true) {
    return `(${pattern})`;
  }

  const min = args.min && args.min > 0 ? args.min : 1;
  const max = args.max && args.max > min ? args.max : "";

  return `(${pattern}{${min},${max}})`;
}

type IncludeRequirement =
  | {
      /**
       * This number must be greater than 0
       */
      min?: number;
      /**
       * If you specify the max without the min, the min default will be 1
       */
      max?: number;
    }
  | boolean;

interface StringRequirementsArgs {
  /**
   * The minimum length of the string
   * @default 8
   */
  minLength?: number;
  /**
   * The maximum length of the string
   */
  maxLength?: number;
  /**
   * To include a number from 0 to 9
   * @default true
   */
  includeNumber?: IncludeRequirement;
  /**
   * To include a uppercase letter from A to Z
   * @default true
   */
  includeUppercase?: IncludeRequirement;
  /**
   * To include a lowercase letter from a to z
   * @default true
   */
  includeLowercase?: IncludeRequirement;
  /**
   * To include a special character, the valid ones are: #?!@$%^&*-
   * @default true
   */
  includeSpecial?: IncludeRequirement;
}
