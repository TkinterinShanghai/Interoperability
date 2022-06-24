import fs from "fs";
import path from "path";
import { file } from "../../types/file";
import { pathToFiles } from "./PathToFiles";

export const fileExists = (file: file) =>
  fs.existsSync(path.join(__dirname, ...pathToFiles, file));
