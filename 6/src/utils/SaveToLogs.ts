import { Request } from "express";
import { fileExists } from "./file/FileExists";
import { readFile } from "./file/ReadFile";
import { writeToFile } from "./file/WriteToFile";

export const saveToLogs = (req: Request) => {
  const { headers, body, params, method, path, httpVersion, url } = req;
  const logs = fileExists("logs.json") ? (readFile("logs.json") as any[]) : [];
  logs.push({ headers, body, params, method, path, httpVersion, url });
  writeToFile(logs, "logs.json");
};
