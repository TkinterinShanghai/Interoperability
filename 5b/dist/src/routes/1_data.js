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
exports.data1 = void 0;
const express_1 = require("express");
const ResponseBuilder_1 = __importDefault(require("../utils/ResponseBuilder"));
exports.data1 = (0, express_1.Router)();
const file = "1_data";
const endpoints = {
    adress: (email) => `/complaint/customer/${email}/adress`,
    street: (email) => `/complaint/customer/${email}/adress/street`,
};
exports.data1.post("/complaint/customer/:email/adress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mutationFunction = function (fileJson) {
        fileJson.ComplaintOverview.complaint
            .filter((complaint) => complaint.customer[0].email[0] === req.params.email)[0]
            .customer[0].adress.push(req.body.payload);
    };
    const xpath = "//complaint/customer/adress/adress";
    const xpathStructure = { zip: "@zip" };
    const response = new ResponseBuilder_1.default(file, xpath, xpathStructure, false);
    try {
        yield response.mutateFile(mutationFunction);
    }
    catch (_a) {
        return res.status(500).send();
    }
    response.addLinks({ street: endpoints.street(req.params.email) });
    const xml = yield response.xml();
    res.status(200).send(xml);
}));
exports.data1.get("/complaint/customer/:email/adress/street", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xpath = `//complaint/customer/adress/adress/street[../../../email[text()='${req.params.email}']]`;
    const xpathStructure = {
        name: "title-case(name)",
        number: "title-case(number)",
    };
    const response = yield new ResponseBuilder_1.default(file, xpath, xpathStructure)
        .addLinks({ adress: endpoints.adress(req.params.email) })
        .xml();
    res.status(200).send(response);
}));
