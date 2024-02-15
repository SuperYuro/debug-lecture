// deno-lint-ignore-file for-direction
export function Lesson7(datum: number[]): number {
  const l = datum.length;
  let sum = 0;

  for (let i = l; i > 0; i++) {
    sum += datum[i];
  }
  return sum;
}
