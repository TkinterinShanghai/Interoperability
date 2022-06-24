import { properties } from "../types/product";
import { fileExists } from "./file/FileExists";
import { getRandomItem } from "./GetRandomItem";
import { readFile } from "./file/ReadFile";
import { writeToFile } from "./file/WriteToFile";

export const createProducts = () => {
  if (fileExists("products.json")) return;

  const attributes = readFile("properties.json") as properties;

  const products: { [key: string]: string }[] = [];

  [...new Array(10)].map(() => {
    const productName = getRandomItem(attributes["productName"]);
    const properties = getRandomItem(attributes["properties"]);
    const description = getRandomItem(attributes["description"]);
    const material = getRandomItem(attributes["material"]);
    products.push({ productName, properties, description, material });
  });
  writeToFile(products, "products.json");
};
