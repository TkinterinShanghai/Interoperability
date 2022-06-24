"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camaro_1 = require("camaro");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const xml2js_1 = require("xml2js");
class ResponseBuilder {
    constructor(fileName, xPath, structure, loggingEnabled = false) {
        this.fileName = fileName;
        this.xPath = xPath;
        this.structure = structure;
        this.loggingEnabled = loggingEnabled;
        this.file = "";
        this.fileJson = {};
        this.jsonEdited = {};
        this.result = { result: {}, links: {} };
    }
    checkErrors() {
        const { links, result } = this.result;
        if (Object.keys(links).length === 0 || Object.keys(result).length === 0) {
            throw new Error("No values or links present");
        }
    }
    readFile() {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = fs.readFileSync(path_1.default.join(__dirname, "..", "..", "xmls", `${this.fileName}.xml`), {
                encoding: "utf8",
            });
            this.logger("readFile");
        });
    }
    writeFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const xml = this.JSONtoXML(this.jsonEdited);
            fs.writeFileSync(path_1.default.join(__dirname, "..", "..", "xmls", `${this.fileName}.xml`), xml);
            this.logger("writeFile");
            return this;
        });
    }
    JSONtoXML(json) {
        const builder = new xml2js_1.Builder();
        return builder.buildObject(json);
    }
    readFileJson() {
        this.readFile();
        (0, xml2js_1.parseString)(this.file, (_err, result) => {
            this.fileJson = result;
        });
        this.logger("readFileJson");
        return this;
    }
    mutateFile(func) {
        this.jsonEdited = func(this.fileJson);
        this.logger("mutateFile");
        return this;
    }
    applyXPath() {
        return __awaiter(this, void 0, void 0, function* () {
            this.readFile();
            this.result.result = yield (0, camaro_1.transform)(this.file, [this.xPath, this.structure]);
            this.logger("applyXPath");
        });
    }
    addLinks(links) {
        this.result.links = Object.assign(Object.assign({}, this.result.links), links);
        this.logger("addLinks");
        return this;
    }
    json() {
        this.checkErrors();
        return this.result;
    }
    xml() {
        this.checkErrors();
        return new xml2js_1.Builder().buildObject(this.result);
    }
    logger(fnName) {
        if (this.loggingEnabled) {
            switch (fnName) {
                case "readFile":
                    console.log("in ", fnName, ", file: ", this.file.slice(1, 50));
                    break;
                case "writeFile":
                    console.log("in ", fnName);
                    break;
                case "readFileJson":
                    console.log("in ", fnName, ", fileJson: ", this.fileJson);
                    break;
                case "mutateFile":
                    console.log("in ", fnName, ", jsonEdited: ", this.jsonEdited);
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
exports.default = ResponseBuilder;
const writeFile = (result, fileName, content) => __awaiter(void 0, void 0, void 0, function* () {
    // convert SJON objec to XML
    const builder = new xml2js_1.Builder();
    const xml = builder.buildObject(result);
    // write updated XML string to a file
    fs.writeFileSync(path_1.default.join(__dirname, "..", "..", "xmls", `${fileName}.xml`), xml);
});
const readFile = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const res = fs.readFileSync(path_1.default.join(__dirname, "..", "..", "xmls", `${fileName}.xml`), {
        encoding: "utf8",
    });
    // convert XML data to JSON object
    (0, xml2js_1.parseString)(res, (err, result) => {
        if (err) {
            throw err;
        }
        response = result;
    });
    return response;
});
