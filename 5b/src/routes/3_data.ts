import { Request, Router } from "express";
import ResponseBuilder from "../utils/ResponseBuilder";

export const data3 = Router();
const file = "3_data";

const endpoints = {
  rating: () => "/CustomerComplaintAppointment/appointment/rating",
  complaint: () => "/CustomerComplaintAppointment/appointment/complaint",
};

data3.get("/appointment/rating", async (req: Request<any, any, { importance: number }>, res) => {
  const xpath = `CustomerComplaintAppointment/appointment[./customer/@importance < ${req.body.importance}]`;
  const xpathStructure = { rating: "@rating" };

  const response = await new ResponseBuilder(file, xpath, xpathStructure)
    .addLinks({ complaint: endpoints.complaint() })
    .json();

  res.status(200).send(response);
});

data3.get("/appointment/complaint", async (req: Request<any, any, { importance: number }>, res) => {
  const xpath = `CustomerComplaintAppointment/appointment/complaint[../customer/@importance < ${req.body.importance}][./isresolved[text()= 'false']]`;
  const xpathStructure = {
    id: ".//id",
    isresolved: ".//isresolved",
    issuedate: ".//issuedate",
  };

  const response = await new ResponseBuilder(file, xpath, xpathStructure)
    .addLinks({ rating: endpoints.rating() })
    .json();
  res.status(200).send(response);
});
