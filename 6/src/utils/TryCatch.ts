import { Response } from "express";

export const tryCatch = (arg: () => any, res: Response) => {
  try {
    const resBody = arg();
    if (!resBody) throw new Error();
    return res.send(resBody);
  } catch (e) {
    console.log(e);
    return res.status(404).send("not found");
  }
};
