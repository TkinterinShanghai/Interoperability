import { inventoryPartial } from "../types/inventory";
import { product } from "../types/product";
import { fileExists } from "./file/FileExists";
import { readFile } from "./file/ReadFile";
import { writeToFile } from "./file/WriteToFile";

export const createInventory = () => {
  if (fileExists("inventory.json")) return;

  const products = readFile("products.json") as any;

  const inventory: inventoryPartial = {};
  products.map((product: product) =>
    Object.entries(product).map(([key, value]) => {
      const keyofProduct = key as keyof product;
      inventory[keyofProduct]
        ? (inventory[keyofProduct]![value] = inventory[keyofProduct]![value] + 1 || 1)
        : (inventory[keyofProduct] = { [value]: 1 });
    })
  );
  writeToFile(inventory, "inventory.json");
};
