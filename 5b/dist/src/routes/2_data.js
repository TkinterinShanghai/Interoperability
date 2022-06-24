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
exports.data2 = void 0;
const express_1 = require("express");
const ResponseBuilder_1 = __importDefault(require("../utils/ResponseBuilder"));
exports.data2 = (0, express_1.Router)();
const file = "2_data";
const endpoints = {
    adress: () => `/appointment/employee/:employeeId/adress`,
    street: () => "/appointment/:rating/employee/adress/street",
    complaint: () => "/appointment/:handled/complaint",
};
exports.data2.put("/appointment/:handled/complaint", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mutationFunction = function (fileJson) {
        fileJson.AppointmentOverview.appointment.filter((appointment) => appointment.$.handled === req.params.handled)[0].complaint[0] = req.body.content;
    };
    const xpath = `AppointmentOverview/appointment[@handled='${req.params.handled}']/complaint`;
    const xpathStructure = { issueDate: "issueDate" };
    const response = new ResponseBuilder_1.default(file, xpath, xpathStructure, false);
    try {
        yield response.mutateFile(mutationFunction);
    }
    catch (_a) {
        return res.status(404).send();
    }
    response.addLinks({ adress: endpoints.adress(), street: endpoints.street() });
    const xml = yield response.xml();
    res.status(200).send(xml);
}));
// TODO: Executing this didnt work anymore, probably because of parseXML.read
exports.data2.patch("/appointment/employee/:employeeId/adress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mutationFunction1 = function (fileJson) {
        fileJson.AppointmentOverview.appointment.filter((appointment) => appointment.employee[0].id[0] === req.params.employeeId)[0].employee[0].adress[0].adress[0].$.zip = req.body.zip;
    };
    const mutationFunction2 = function (fileJson) {
        fileJson.AppointmentOverview.appointment.filter((appointment) => appointment.employee[0].id[0] === req.params.employeeId)[0].employee[0].adress[0].adress[0].street[0].name = req.body.streetName;
    };
    const xpath = `AppointmentOverview/appointment/employee[./id='${req.params.employeeId}']/adress`;
    const xpathStructure = {
        street: {
            name: ".//adress/street/name",
            number: ".//adress/street/number",
        },
    };
    const response = new ResponseBuilder_1.default(file, xpath, xpathStructure, false);
    try {
        yield response.mutateFile(mutationFunction1);
        yield response.mutateFile(mutationFunction2);
    }
    catch (e) {
        console.log(e);
        return res.status(404).send();
    }
    response.addLinks({ complaint: endpoints.complaint(), street: endpoints.street() });
    const xml = yield response.xml();
    res.status(200).send(xml);
}));
exports.data2.delete("/appointment/:rating/employee/adress/street", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mutationFunction = function (fileJson) {
        delete fileJson.AppointmentOverview.appointment.filter((appointment) => appointment.$.rating === req.params.rating)[0].employee[0].adress[0].adress[0].street[0];
    };
    const xpath = `AppointmentOverview/appointment/employee[../@rating='${req.params.rating}']`;
    const xpathStructure = {
        adress: {
            attributes: {
                zip: ".//adress/@zip",
                country: ".//adress/@country",
            },
            street: {
                name: ".//street/name",
                number: ".//street/number",
            },
        },
        id: ".//id",
    };
    const response = new ResponseBuilder_1.default(file, xpath, xpathStructure, false);
    try {
        yield response.mutateFile(mutationFunction);
    }
    catch (e) {
        console.log(e);
        return res.status(404).send();
    }
    response.addLinks({ complaint: endpoints.complaint(), street: endpoints.street() });
    const json = yield response.json();
    res.status(200).send(json);
}));
