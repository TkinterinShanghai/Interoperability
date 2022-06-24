import fs from "fs";
import path from "path";
import { file } from "../../types/file";
import { pathToFiles } from "./PathToFiles";

export const appendToFile = (arg: any, file: file) =>
  fs.appendFileSync(path.join(__dirname, ...pathToFiles, file), JSON.stringify(arg));
