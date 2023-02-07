import minimist from "minimist";
import color from "cli-color";
const argv = minimist(process.argv.slice(2), {
  boolean: ["help", "dry-run","verbose","debug"],
  alias: { v: "verbose", d:"debug" },
});

const help = () => {
  if (!argv._.length || argv.help) {
    console.log(
      color.yellow(
        [
          "options",
          "--help (this command)",
          "--dry-run (do not write the files into data/output/XX.xml, but display it on screen)",
          "--verbose (display the xml on screen)",
          "--debug (read from data/sample.jsonl)",
          " jsonl_file"
        ].join("\n")
      )
    );
    process.exit(0);
  }
};

if (argv.debug) {
  argv._.push ("sample.jsonl");
  if (!argv["dry-run"]) // it must either be dry-run or verbose if debug
    argv.verbose = true;
}
help();

export default argv;
