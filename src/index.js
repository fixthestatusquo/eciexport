import fs from "fs";
import { parse } from "js2xmlparser";
import path from "path";
import steam from "stream";
// import { json } from "./helper.js";
import * as readline from "node:readline";
import { transform } from "./transform.js";
import argv from "./argv.js";
import countries from "./countries.js";

const pathData = file => path.resolve(process.cwd(), file);

const fileName = argv._[0] || "./data/sample.jsonl";

const input = fs.createReadStream(
  pathData(fileName)
);


const url = (file = "output") => {
  pathData(file)
};


const output = {};
const count = {};
Object.keys(countries).forEach( iso => {
  const country = iso.toUpperCase();
  if (argv["dry-run"]) {
    output[country] = process.stdout;
    return;
  }
  output[country] = fs.createWriteStream(pathData("./output/" + country + ".xml"));
  count[country] = 0;
});



const readFile = readline.createInterface({
  input: input,
  terminal: false,
});

readFile.on("line", line => {
    if (!line) return {};
    const signature = JSON.parse(line);
  const country = signature.contact.nationality.country;
    const xml = transform (signature);
console.log(this);
    output[country].write(xml);
    count[country]++;
  })
  .on("close", function () {
    Object.entries(count).forEach ( ([iso,total]) => {
      console.log(iso,total);
    });
});
