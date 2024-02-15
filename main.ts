function Greet() {
  console.log("Hello, world!");
}

function main() {
  Greet;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
