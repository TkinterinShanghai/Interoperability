import fs from "fs";
import path from "path";
import { file } from "../../types/file";
import { pathToFiles } from "./PathToFiles";

export const readFile = (file: file, xml = false) => {
  if (!xml) {
    try {
      return JSON.parse(fs.readFileSync(path.join(__dirname, ...pathToFiles, file), "utf8")) as
        | any[]
        | {
            [key: string]: unknown;
          };
    } catch {
      return {};
    }
  } else {
    return fs.readFileSync(path.join(__dirname, ...pathToFiles, file), "utf8");
  }
};
