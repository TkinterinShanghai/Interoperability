import fs from "fs";
import path from "path";
import { file } from "../../types/file";
import { pathToFiles } from "./PathToFiles";

export const writeToFile = (arg: any, file: file) =>
  fs.writeFileSync(path.join(__dirname, ...pathToFiles, file), JSON.stringify(arg), "utf8");
