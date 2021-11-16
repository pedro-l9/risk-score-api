import { NextFunction, Request, RequestHandler, Response } from 'express';

export default function errorWrapper(handler: RequestHandler) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
