import express from "express";
import bodyparser from "body-parser";
import { data1 } from "./src/routes/1_data";
import { data2 } from "./src/routes/2_data";
import { data3 } from "./src/routes/3_data";
import { data4 } from "./src/routes/4_data";

const app = express();
app.use(bodyparser.json());

app.use("/ComplaintOverview", data1);
app.use("/AppointmentOverview", data2);
app.use("/CustomerComplaintAppointment", data3);
app.use("/Facilities", data4);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(9881);

app.set("port", process.env.PORT || 9881);
