export function chunk(array, size = 1) {
  const result:any[][] = []
  for (var i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size) as unknown as any[]);
  }
  return result
}
