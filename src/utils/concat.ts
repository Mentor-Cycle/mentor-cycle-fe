/**
 * @param rawStrings Strings a serem juntadas.
 * @input `function("My", "name", "is", "John")`
 * @returns `"My name is John"`
 */
export function concat(...rawStrings: string[]) {
  let result = "";
  const nonEmptyStrings = rawStrings.filter((s) => s.length);
  const strings = nonEmptyStrings.map((s) => s.trim());

  strings.forEach((str, index) => {
    const space = index === 0 ? "" : " ";
    result = result + space + str;
  });

  return result;
}

// * ptbr_docs
