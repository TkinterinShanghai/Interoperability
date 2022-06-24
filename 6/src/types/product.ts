export type product = {
  productName: string;
  description: string;
  properties: string;
  material: string;
};

export type properties = Record<keyof product, string[]>;
