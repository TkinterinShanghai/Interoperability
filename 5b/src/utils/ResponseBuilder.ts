import { transform } from "camaro";
import * as fs from "fs";
import path from "path";
import { Builder, parseString } from "xml2js";

export default class ResponseBuilder {
  private file: string = "";
  private fileJson: object = {};
  private result: Record<"result" | "links", any> = { result: {}, links: {} };
  constructor(
    private fileName: string,
    private xPath: string,
    private structure: object,
    private loggingEnabled = false
  ) {
    this.readFileJson();
  }

  private checkErrors() {
    const { links, result } = this.result;
    if (Object.keys(links).length === 0 || Object.keys(result).length === 0) {
      throw new Error("No values or links present");
    }
  }

  private async readFile() {
    this.file = fs.readFileSync(path.join(__dirname, "..", "xmls", `${this.fileName}.xml`), {
      encoding: "utf8",
    });
    this.logger("readFile");
  }

  private async writeFile() {
    const xml = this.JSONtoXML(this.fileJson);
    fs.writeFileSync(path.join(__dirname, "..", "xmls", `${this.fileName}.xml`), xml);
    this.logger("writeFile");
    return this;
  }

  private JSONtoXML(json: object) {
    const builder = new Builder();
    return builder.buildObject(json);
  }

  private readFileJson() {
    this.readFile();
    parseString(this.file, (_err, result) => {
      this.fileJson = result;
      this.result.result = result;
    });
    this.logger("readFileJson");
    return this;
  }

  async mutateFile(func: (args: any) => void) {
    func(this.fileJson);
    await this.writeFile();
    this.logger("mutateFile");
    return this;
  }

  private async applyXPath() {
    this.readFile();
    this.result.result = await transform(this.file, [this.xPath, this.structure]);
    this.logger("applyXPath");
    return this;
  }

  addLinks(links: { [key: string]: string }) {
    this.result.links = { ...this.result.links, ...links };
    this.logger("addLinks");
    return this;
  }

  async json() {
    await this.applyXPath();
    this.checkErrors();
    return this.result;
  }

  async xml() {
    await this.applyXPath();
    this.checkErrors();
    return new Builder().buildObject(this.result);
  }

  private logger(fnName: string) {
    if (this.loggingEnabled) {
      switch (fnName) {
        case "readFile":
          console.log("in ", fnName, ", file: ", this.file);
          break;
        case "writeFile":
          console.log("in ", fnName);
          break;
        case "readFileJson":
          console.log("in ", fnName, ", fileJson: ", this.fileJson);
          break;
        case "mutateFile":
          console.log("in ", fnName, ", jsonEdited: ", this.fileJson);
          break;
        case "applyXPath":
          console.log("in ", fnName, ", result.result: ", this.result.result);
          break;
        case "addLinks":
          console.log("in ", fnName, ", result.links: ", this.result.links);
          break;
      }
    }
  }
}
