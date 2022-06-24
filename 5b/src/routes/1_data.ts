import { Request, Router } from "express";
import ResponseBuilder from "../utils/ResponseBuilder";

export const data1 = Router();
const file = "1_data";

type address = {
  adress: [{ $: { zip: number; country: string }; street: [{ name: [string]; number: [number] }] }];
};

const endpoints = {
  adress: (email: string) => `ComplaintOverview/complaint/customer/${email}/adress`,
  street: (email: string) => `ComplaintOverview/complaint/customer/${email}/adress/street`,
};

data1.post(
  "/complaint/customer/:email/adress",
  async (req: Request<{ email: string }, any, { payload: address }>, res) => {
    const mutationFunction = function (fileJson: any) {
      fileJson.ComplaintOverview.complaint
        .filter((complaint: any) => complaint.customer[0].email[0] === req.params.email)[0]
        .customer[0].adress.push(req.body.payload);
    };

    const xpath = "//complaint/customer/adress/adress";
    const xpathStructure = { zip: "@zip" };

    const response = new ResponseBuilder(file, xpath, xpathStructure, false);
    try {
      await response.mutateFile(mutationFunction);
    } catch {
      return res.status(500).send();
    }
    response.addLinks({ street: endpoints.street(req.params.email) });
    const xml = await response.xml();
    res.status(200).send(xml);
  }
);

data1.get(
  "/complaint/customer/:email/adress/street",
  async (req: Request<{ email: string }>, res) => {
    const xpath = `//complaint/customer/adress/adress/street[../../../email[text()='${req.params.email}']]`;
    const xpathStructure = {
      name: "title-case(name)",
      number: "title-case(number)",
    };
    const response = await new ResponseBuilder(file, xpath, xpathStructure)
      .addLinks({ adress: endpoints.adress(req.params.email) })
      .xml();
    res.status(200).send(response);
  }
);
