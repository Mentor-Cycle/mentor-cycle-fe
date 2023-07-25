/**
 * @param email Strings como `"seunome@provider.com"`
 * @returns `"seunome"`
 */
export function getEmailUsername(email: string) {
  if (!email.includes("@")) return "";
  const [username] = email.split("@");
  return username;
}

// * ptbr_docs
