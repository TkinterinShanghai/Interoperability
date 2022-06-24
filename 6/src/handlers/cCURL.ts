import https from "https";
import { readFile } from "../utils/file/ReadFile";
import { Request } from "express";

const start =
  '------\r\nContent-Disposition: form-data; name="behavior"\r\n\r\nfork_running\r\n------\r\nContent-Disposition: form-data; name="xml"\r\nContent-Type: text/xml\r\n\r\n';

const xml = readFile("production.xml", true) as string;

const end = "\r\n------\r\n";

const resBody = start + xml + end;

const options: https.RequestOptions = {
  host: "cpee.org",
  port: 443,
  path: "/flow/start/xml/",
  method: "POST",
  headers: { "Content-Type": "multipart/form-data;boundary=----" },
};

export const cCURL = ({ body }: Request) => {
  console.log(body);
  xml.replace(
    "http://abgabe.cs.univie.ac.at:9886/productName",
    "http://abgabe.cs.univie.ac.at:9886/productName/" + body["productName"]
  );
  xml.replace(
    "http://abgabe.cs.univie.ac.at:9886/properties",
    "http://abgabe.cs.univie.ac.at:9886/properties/" + body["properties"]
  );
  xml.replace(
    "http://abgabe.cs.univie.ac.at:9886/description",
    "http://abgabe.cs.univie.ac.at:9886/description/" + body["description"]
  );
  xml.replace(
    "http://abgabe.cs.univie.ac.at:9886/material",
    "http://abgabe.cs.univie.ac.at:9886/material/" + body["material"]
  );

  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // Write data to request body
  req.write(resBody);
  req.end();
};
