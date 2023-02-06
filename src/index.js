
import fs from 'fs';
import { parse } from "js2xmlparser";
// import { json } from "./helper.js";
import * as readline from 'node:readline';


const input =  fs.createReadStream(
    new URL('../data/sample.jsonl', import.meta.url)
)

const output = fs.createWriteStream(
  new URL('../data/output.xml', import.meta.url)
);

console.log("fileeee", input)

const readFile = readline.createInterface({
  input: input,
  output: output,
  terminal: false
});

const transform = line => {
  console.log("linee", line);
}

readFile
  .on('line', transform)
  .on('close', function() {
    console.log(`Created "${this.output.path}"`);
  });


//const xml = parse("supportForm", json);
// console.log(xml);