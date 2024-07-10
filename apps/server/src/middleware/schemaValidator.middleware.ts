import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function SchemaValidator(schema: AnyZodObject){
  return async (req: Request, res: Response, next: NextFunction) =>{
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    }catch (e){
      if (e instanceof ZodError){
        return res.status(400).json(
          e.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
            code: issue.code,
          }))
        )
      }
      next(e)
    }
  }
}
