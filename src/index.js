
import { readFile } from 'fs/promises';
import { parse } from "js2xmlparser";
import { json } from "./helper.js";

const xml = parse("supportForm", json);
console.log(xml);