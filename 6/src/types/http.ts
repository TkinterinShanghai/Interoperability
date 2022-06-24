import { product } from "./product";

export type partModelRequest = { part: keyof product; model: string };
