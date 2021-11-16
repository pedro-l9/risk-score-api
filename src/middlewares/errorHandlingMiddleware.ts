import { NextFunction, Request, Response } from 'express';

type Unknown = any;

function errorHandlingMiddleware(
  err: Unknown,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  if (err.name === 'ValidationError') {
    const errors = err.details
      .map((details: any) => details.message)
      .join('\n');

    res.status(400).send(`Bad request\n\n${errors}`);
  }
}

export default errorHandlingMiddleware;
