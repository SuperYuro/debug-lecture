import { Lesson7 } from "./lesson7.ts";

function main() {
  const sum = Lesson7([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  console.log(sum);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
