"use strict";
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
exports.data4 = void 0;
const express_1 = require("express");
const ResponseBuilder_1 = __importDefault(require("../utils/ResponseBuilder"));
exports.data4 = (0, express_1.Router)();
const file = "4_data";
exports.data4.get("/:attribute", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xpath = `LocatedAtFacility/facility/@${req.params.attribute} | LocatedAtFacility/facility/employe/@${req.params.attribute}`;
    const xpathStructure = { email: "." };
    const response = yield new ResponseBuilder_1.default(file, xpath, xpathStructure)
        .addLinks({ attribute: "/:attribute" })
        .json();
    res.status(200).send(response);
}));
