import { Request, Router } from "express";
import ResponseBuilder from "../utils/ResponseBuilder";

export const data2 = Router();
const file = "2_data";

type ChangeComplaintRequestBody = {
  content: { fridgeId: number; isresolved: boolean; issuedate: number };
};

const endpoints = {
  adress: () => `AppointmentOverview/appointment/employee/:employeeId/adress`,
  street: () => "AppointmentOverview/appointment/:rating/employee/adress/street",
  complaint: () => "AppointmentOverview/appointment/:handled/complaint",
};

data2.put(
  "/appointment/:handled/complaint",
  async (req: Request<{ handled: string }, any, ChangeComplaintRequestBody>, res) => {
    const mutationFunction = function (fileJson: any) {
      fileJson.AppointmentOverview.appointment.filter(
        (appointment: any) => appointment.$.handled === req.params.handled
      )[0].complaint[0] = req.body.content;
    };
    const xpath = `AppointmentOverview/appointment[@handled='${req.params.handled}']/complaint`;
    const xpathStructure = { issueDate: "issueDate" };

    const response = new ResponseBuilder(file, xpath, xpathStructure, false);
    try {
      await response.mutateFile(mutationFunction);
    } catch {
      return res.status(404).send();
    }
    response.addLinks({ adress: endpoints.adress(), street: endpoints.street() });
    const xml = await response.xml();

    res.status(200).send(xml);
  }
);

type ChangeAppointmentAddressRequestBody = { zip: number; streetName: string };

// TODO: Executing this didnt work anymore, probably because of parseXML.read
data2.patch(
  "/appointment/employee/:employeeId/adress",
  async (req: Request<{ employeeId: string }, any, ChangeAppointmentAddressRequestBody>, res) => {
    const mutationFunction1 = function (fileJson: any) {
      fileJson.AppointmentOverview.appointment.filter(
        (appointment: any) => appointment.employee[0].id[0] === req.params.employeeId
      )[0].employee[0].adress[0].adress[0].$.zip = req.body.zip;
    };

    const mutationFunction2 = function (fileJson: any) {
      fileJson.AppointmentOverview.appointment.filter(
        (appointment: any) => appointment.employee[0].id[0] === req.params.employeeId
      )[0].employee[0].adress[0].adress[0].street[0].name = req.body.streetName;
    };
    const xpath = `AppointmentOverview/appointment/employee[./id='${req.params.employeeId}']/adress`;
    const xpathStructure = {
      street: {
        name: ".//adress/street/name",
        number: ".//adress/street/number",
      },
    };

    const response = new ResponseBuilder(file, xpath, xpathStructure, false);
    try {
      await response.mutateFile(mutationFunction1);
      await response.mutateFile(mutationFunction2);
    } catch (e) {
      console.log(e);
      return res.status(404).send();
    }
    response.addLinks({ complaint: endpoints.complaint(), street: endpoints.street() });
    const xml = await response.xml();

    res.status(200).send(xml);
  }
);

data2.delete(
  "/appointment/:rating/employee/adress/street",
  async (req: Request<{ rating: number }, any, never>, res) => {
    const mutationFunction = function (fileJson: any) {
      delete fileJson.AppointmentOverview.appointment.filter(
        (appointment: any) => appointment.$.rating === req.params.rating
      )[0].employee[0].adress[0].adress[0].street[0];
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

    const response = new ResponseBuilder(file, xpath, xpathStructure, false);
    try {
      await response.mutateFile(mutationFunction);
    } catch (e){
      console.log(e)
      return res.status(404).send();
    }
    response.addLinks({ complaint: endpoints.complaint(), street: endpoints.street() });
    const json = await response.json();

    res.status(200).send(json);
  }
);
