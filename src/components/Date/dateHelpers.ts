export const isValidDate = (dateString: string) => {
  const regEx = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateString.match(regEx)) return false;
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (
    year < 1900 ||
    year > new Date().getFullYear() ||
    month == 0 ||
    month > 12
  )
    return false;
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;
  return day > 0 && day <= monthLength[month - 1];
};
