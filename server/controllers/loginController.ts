import { UserModel } from '../models/user.ts';
import express, { type Response, type Request } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import errorMiddleware from '../middleware/errorMiddleware.ts';

const loginRouter = express.Router()

loginRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({ username })

  const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash)
                               : false

  if (!passwordMatches) {
    res.status(401).json({
      error: "Invalid login credentials"
    })
    return
  } else if (!process.env.SECRET) {
    res.status(500).json({ error: 'System issue' })
    return
  }
  const userDetails = { username: user?.username, id: user?._id }
  const token = jwt.sign(userDetails, process.env.SECRET)

  res.status(200).send({ token, username: user?.username, name: user?.name })

})

loginRouter.use(errorMiddleware)

export default loginRouter