import { type Response, type Request, type NextFunction } from 'express';
import { ZodError } from 'zod';

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    console.log(error.issues)
    res.status(400).send({ error: error.issues[0]?.message })
  } else {
    console.log(error)
    next(error)
  }
}

export default errorMiddleware