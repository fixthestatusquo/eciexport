import fs from "fs";
import { parse } from "js2xmlparser";
// import { json } from "./helper.js";
import * as readline from "node:readline";
import { transform } from "./transform.js";

const input = fs.createReadStream(
  new URL("../data/sample.jsonl", import.meta.url)
);

const url = (file = "output") => {
  return new URL(`../data/${file}.xml`, import.meta.url);
};

const readFile = readline.createInterface({
  input: input,
  output: fs.createWriteStream(url()),
  terminal: false,
});

readFile.on("line", transform).on("close", function () {
  console.log(`Created "${this.output.path}"`);
});
