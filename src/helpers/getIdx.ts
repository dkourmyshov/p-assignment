export const getIdx = <T extends {[key: string]: unknown}>( //FIXME: hacky type
  key: string,
  value: unknown,
  array: T[]
): number | undefined => {
  const index = array.findIndex(item => item[key] === value);
  return index === -1 ? undefined : index
};
