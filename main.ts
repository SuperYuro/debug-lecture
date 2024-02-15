import { Lesson8 } from "./lesson8.ts";

async function main() {
  await Lesson8();
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
