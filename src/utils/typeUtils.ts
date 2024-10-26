export function getFieldName<T>(key: keyof T) {
  return key as string;
}
