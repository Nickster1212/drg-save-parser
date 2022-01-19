export function flipObject<K extends string, V extends string>(
  obj: Record<K, V>
): Record<V, K> {
  const ret: { [s: string]: string } = {};
  Object.keys(obj).forEach((key) => {
    ret[(obj as { [s: string]: string })[key] as string] = key;
  });
  return ret as Record<V, K>;
}
