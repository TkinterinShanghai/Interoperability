import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { product, properties } from "../types/product";
import { fileExists } from "./file/FileExists";

const randomProperty = <T extends string | number | symbol>(fn: () => T) =>
  [...new Array(Math.floor(Math.random() * 10) + 2)].map(fn);

export const createProperties = () => {
  if (fileExists("properties.json")) return;

  const productName = randomProperty(faker.commerce.product);
  const properties = randomProperty(faker.commerce.productAdjective);
  const description = randomProperty(faker.commerce.productDescription);
  const material = randomProperty(faker.commerce.productMaterial);
  const attributes: properties = {
    productName,
    properties,
    description,
    material,
  };

  fs.writeFileSync(
    path.join(__dirname, "..", "..", "files", "properties.json"),
    JSON.stringify(attributes),
    "utf8"
  );
};
