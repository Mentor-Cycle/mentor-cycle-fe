export function maskEmail(email: string): string {
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");
  const username = email.substring(0, atIndex);
  const domain = email.substring(atIndex + 1, dotIndex);
  const maskedUsername = `${username.charAt(0)}****${username.charAt(
    username.length - 1
  )}`;
  const maskedDomain = `${domain.charAt(0)}****${domain.charAt(
    domain.length - 1
  )}`;
  const topLevelDomain = email.substring(dotIndex);

  return `${maskedUsername}@${maskedDomain}${topLevelDomain}`;
}
