import { Lesson5 } from "./lesson5.js";

function main() {
  Lesson5("Lesson5");
  Lesson5(25);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
