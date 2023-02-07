import fs from "fs";
import { parse } from "js2xmlparser";
import path from "path";
// import { json } from "./helper.js";
import * as readline from "node:readline";
import { transform } from "./transform.js";
import argv from "./argv.js";
import countries from "./countries.js";
const pathData = file => path.resolve(process.cwd(), "./data/"+file);

const fileName = argv._[0] || "sample.jsonl";


const input = fs.createReadStream(
  pathData(fileName)
);

const url = (file = "output") => {
  pathData(file)
};


const output = {};
Object.keys(countries).forEach( iso => {
  const country = iso.toUpperCase();
  if (argv["dry-run"]) {
    output[country] = process.stdout;
    return;
  }
  output[country] = fs.createWriteStream(pathData("./output/" + country + ".xml"));
});


const readFile = readline.createInterface({
  input: input,
  output: output,
  terminal: false,
});

readFile.on("line", line => {
    if (!line) return {};
    const signature = JSON.parse(line);
  const country = signature.contact.nationality.country;
    const xml = transform (signature);
    console.log (xml);
    output[country].write(xml);
  })
  .on("close", function () {
  console.log(`Created "${this.output.path}"`);
});
