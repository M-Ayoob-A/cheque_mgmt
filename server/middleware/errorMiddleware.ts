import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    console.log(error.issues)
    res.status(400).send({ error: error.issues[0]?.message })
  } else if (error instanceof jwt.JsonWebTokenError) {
    res.status(401).json({ error: 'invalid token' })
  } else {
    console.log(error)
    next(error)
  }
}

export default errorMiddleware