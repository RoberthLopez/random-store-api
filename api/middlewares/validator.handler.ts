import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import boom from "@hapi/boom";

export function validatorHandler(schema: Schema, property: string) {
  return (req: any, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
