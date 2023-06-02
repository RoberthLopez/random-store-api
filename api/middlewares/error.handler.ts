import { Request, Response, NextFunction } from "express";
import { ValidationError, ForeignKeyConstraintError } from "sequelize";

export function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err);
  next(err);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

export function sqlErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // if (err.parent) {
  //   const { fields, parent } = err;
  //   res.status(409).json({
  //     field: fields,
  //     message: parent.detail,
  //   });
  // }
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}
