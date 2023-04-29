export const validateUndefined = (value?: string): string => {
  if (typeof value !== "string") {
    return "";
  }

  if (value.trim() === "undefined") {
    return "";
  }

  return value;
};
