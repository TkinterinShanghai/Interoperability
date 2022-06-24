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
exports.data3 = void 0;
const express_1 = require("express");
const ResponseBuilder_1 = __importDefault(require("../utils/ResponseBuilder"));
exports.data3 = (0, express_1.Router)();
const file = "3_data";
const endpoints = {
    rating: () => "/appointment/rating",
    complaint: () => "/appointment/complaint",
};
exports.data3.get("/appointment/rating", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xpath = `CustomerComplaintAppointment/appointment[./customer/@importance < ${req.body.importance}]`;
    const xpathStructure = { rating: "@rating" };
    const response = yield new ResponseBuilder_1.default(file, xpath, xpathStructure)
        .addLinks({ complaint: endpoints.complaint() })
        .json();
    res.status(200).send(response);
}));
exports.data3.get("/appointment/complaint", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xpath = `CustomerComplaintAppointment/appointment/complaint[../customer/@importance < ${req.body.importance}][./isresolved[text()= 'false']]`;
    const xpathStructure = {
        id: ".//id",
        isresolved: ".//isresolved",
        issuedate: ".//issuedate",
    };
    const response = yield new ResponseBuilder_1.default(file, xpath, xpathStructure)
        .addLinks({ rating: endpoints.rating() })
        .json();
    res.status(200).send(response);
}));
