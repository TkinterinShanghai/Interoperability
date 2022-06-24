import { Request, Router } from "express";
import ResponseBuilder from "../utils/ResponseBuilder";

export const data4 = Router();
const file = "4_data";

data4.get("/:attribute", async (req: Request<{ attribute: string }>, res) => {
  const xpath = `LocatedAtFacility/facility/@${req.params.attribute} | LocatedAtFacility/facility/employe/@${req.params.attribute}`;
  const xpathStructure = { email: "." };

  const response = await new ResponseBuilder(file, xpath, xpathStructure)
    .addLinks({ attribute: "Facilities/:attribute" })
    .json();
  res.status(200).send(response);
});
