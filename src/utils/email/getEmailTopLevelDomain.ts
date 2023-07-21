/**
 * @param email Strings como `"seunome@provider.com"`
 * @returns `"com"`
 */
export function getEmailTopLevelDomain(email: string) {
  if (!email.includes(".")) return "";
  const [topLevelDomain] = email.split(".").reverse();
  return topLevelDomain;
}

// * ptbr_docs
