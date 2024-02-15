import { lesson6 } from "./lesson6.ts";

async function main() {
  await lesson6();
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
