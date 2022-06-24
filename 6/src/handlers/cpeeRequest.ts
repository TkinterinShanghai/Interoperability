import { Request, Response } from "express";
import { cCURL } from "./cCURL";
import https from "https";

const callbacksArr: { [key: string]: string }[] = [];
const progressObj: { [key: string]: { [key: string]: any } } = {};

export const handleCPEERequest = (req: Request, res: Response) => {
  const { headers, body } = req;

  if (headers["content-id"] === "UsbC4Eva") {
    cCURL(req);
    return res.status(200).send("UsbC4Eva success");
  } else if (headers["content-id"] === "producing") {
    callbacksArr.map((callbackUnit) => {
      if (callbackUnit["pid"] === body["pid"]) {
        let progress = "Start";

        Object.values(progressObj).map((obj, i) => {
          if (obj["completion"] === body["completion"]) {
            progress = body["progress"];
            callbacksArr[i]["pid"] = "0";
          }
        });

        const domain = callbackUnit["cpee-callback"].slice(callbackUnit["cpee-callback"].indexOf("/") + 1);
        const path = callbackUnit["cpee-callback"].slice(0, callbackUnit["cpee-callback"].indexOf("/"));

        const options: https.RequestOptions = {
          host: domain,
          port: 443,
          path: path,
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };

        const cpeeRequest = https.request(options);
        cpeeRequest.write(JSON.stringify({ progress }));
        cpeeRequest.end();
      }
    });

    res.status(200).send("Producing Success");
  } else if (headers["cpee-callback"] !== undefined && headers["cpee-callback-id"] !== undefined) {
    const id = {
      "cpee-callback": headers["cpee-callback"] as string,
      "cpee-callback-id": headers["cpee-callback-id"] as string,
      pid: body["pid"],
    };

    callbacksArr.push(id);
    //Set header to say CPEE answer will be send later
    res.setHeader("CPEE-CALLBACK", "true");

    res.status(200).send("CPEE-Callback success");
  } else {
    res.status(404).send("Unknown header");
  }
};
