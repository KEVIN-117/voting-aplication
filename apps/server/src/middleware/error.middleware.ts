import { NextFunction, Response } from 'express';
export function ErrorHandler(err: any, res: Response, next: NextFunction) {
  if (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
}
