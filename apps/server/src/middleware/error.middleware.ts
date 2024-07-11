import { NextFunction, Response } from 'express';
export function ErrorHandler(err, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
}
