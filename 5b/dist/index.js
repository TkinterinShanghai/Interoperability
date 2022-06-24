"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const _1_data_1 = require("./src/routes/1_data");
const _2_data_1 = require("./src/routes/2_data");
const _3_data_1 = require("./src/routes/3_data");
const _4_data_1 = require("./src/routes/4_data");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/ComplaintOverview", _1_data_1.data1);
app.use("/AppointmentOverview", _2_data_1.data2);
app.use("/CustomerComplaintAppointment", _3_data_1.data3);
app.use("/Facilities", _4_data_1.data4);
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.listen(9881);
app.set("port", process.env.PORT || 9881);
