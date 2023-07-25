/**
 * @param email Strings como `"seunome@provider.com"`
 * @returns `"provider"`
 */
export function getEmailDomain(email: string) {
  if (!email.includes("@")) return "";
  const [_, domainAndTopLevelDomain] = email.split("@");
  const [domain] = domainAndTopLevelDomain.split(".");
  return domain;
}

// * ptbr_docs
