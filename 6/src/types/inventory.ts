import { product } from "./product";

export type inventoryPartial = { [key in keyof product]?: { [key: string]: number } };
export type inventory = { [key in keyof product]: { [key: string]: number } };
