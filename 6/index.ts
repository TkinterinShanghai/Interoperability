import express, { Request } from "express";
import bodyparser from "body-parser";
import morgan from "morgan";
import status from "./files/status.json";
import { createProducts } from "./src/utils/CreateProducts";
import { createProperties } from "./src/utils/CreateProperties";
import { createInventory } from "./src/utils/CreateInventory";
import { readFile } from "./src/utils/file/ReadFile";
import { inventory } from "./src/types/inventory";
import { tryCatch } from "./src/utils/TryCatch";
import { getRandomItem } from "./src/utils/GetRandomItem";
import { writeToFile } from "./src/utils/file/WriteToFile";
import { partModelRequest } from "./src/types/http";
import { fileExists } from "./src/utils/file/FileExists";
import { cCURL } from "./src/handlers/cCURL";
import { handleCPEERequest } from "./src/handlers/cpeeRequest";
import { saveToLogs } from "./src/utils/SaveToLogs";
import { product } from "./src/types/product";

createProperties();
createProducts();
createInventory();

const app = express();
app.use(bodyparser.json());
app.use(morgan("tiny"));

// TODO: post or put, check if either of them works. It was post first
app.put("/correlator", async (req: Request<any, any, any>, res) => {
  saveToLogs(req);
  cCURL(req);
  res.status(200).send();
});

app.post("/correlator", async (req: Request<any, any, any>, res) => {
  saveToLogs(req);
  handleCPEERequest(req, res);
});

app.get("/order", async (req: Request, res) => {
  const products = readFile("products.json") as product[];
  const product = getRandomItem(products);
  res.status(200).send(product);
});

app.get("/:arg([0-3])", async (req: Request<{ arg: string }>, res) => {
  const index = Number(req.params.arg);
  res.send(status[index]);
});

app.get("/:part", async (req: Request<{ part: keyof inventory }>, res) => {
  const inventory = readFile("inventory.json") as inventory;
  tryCatch(() => inventory[req.params.part], res);
});

app.get("/:part/:model", async (req: Request<partModelRequest>, res) => {
  const inventory = readFile("inventory.json") as inventory;
  // todo: {amount: zahl}
  tryCatch(() => inventory[req.params.part][req.params.model].toString(), res);
});

app.put("/:part/:model", async (req: Request<partModelRequest, any, { amount: number }>, res) => {
  const inventory = readFile("inventory.json") as inventory;
  tryCatch(() => {
    inventory[req.params.part][req.params.model] = req.body.amount;
    writeToFile(inventory, "inventory.json");
    return inventory[req.params.part][req.params.model].toString();
  }, res);
});

app.listen(9882);

app.set("port", process.env.PORT || 9882);
