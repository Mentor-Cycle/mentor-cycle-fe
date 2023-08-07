export function removeTypenameProperty<T extends { __typename: string }>(
  objectWithTypenameProperty: T
): Omit<T, "__typename"> {
  const { __typename, ...objectWithoutTypename } = objectWithTypenameProperty;
  return objectWithoutTypename;
}
