import minimist from "minimist";
const argv = minimist(process.argv.slice(2), {
  boolean: ["help", "dry-run","verbose"],
  alias: { v: "verbose" },
});

export default argv;
