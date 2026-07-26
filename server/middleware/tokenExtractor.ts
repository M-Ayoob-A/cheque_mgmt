import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.get('Authorization')

  const token = authHeader && authHeader.startsWith('Bearer ')
                ? authHeader.replace('Bearer ', '')
                : null
                
  if (!token) {
    res.status(401).json({ error: 'invalid token' })
    return
  } else if (!process.env.SECRET) {
    console.log("processENVSECRET: ", process.env.SECRET)
    res.status(500).json({ error: 'System issue' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    if (typeof decoded === 'string' || !decoded.id) {
      res.status(401).json({ error: 'invalid token' })
      return
    }
    req.userId = decoded.id
    next()
  } catch (err) {
    next(err)
  }

  // If other user details needed, can attach the user object itself to the
  // req object. If diong this, edit global declaration in types.ts

}

export default tokenExtractor