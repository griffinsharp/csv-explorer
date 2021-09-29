export const objectIsValid = obj => (
  obj && (Object.keys(obj).length > 0)
);

export const nestedObjectIsEmpty = obj => {
  if (obj === undefined) return true;
  return Object.values(obj).every(subObj => !objectIsValid(subObj));
};