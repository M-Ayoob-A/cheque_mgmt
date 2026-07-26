import { UserModel } from '../models/user.ts';
import express, { /*type NextFunction,*/ type Response, type Request } from 'express';
import bcrypt from 'bcrypt'
//import jwt from 'jsonwebtoken'
//import { CustomerSchema } from '../types.ts';
import errorMiddleware from '../middleware/errorMiddleware.ts';

/*const customerParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    CustomerSchema.parse(req.body)
    next()
  } catch (err: unknown) {
    next(err)
  }
}*/

const userRouter = express.Router()

/*custRouter.get('/', async (_req: Request, res: Response<MCustomerType[]>) => {
  const customers = await CustomerModel.find({})//.populate('user', { username: 1, name: 1 })
  res.json(customers)
})*/

/*custRouter.get('/:id', async (req, res) => {
  const cheque = await CustomerModel.find({ 'id' : req.params.id })//.populate('user', { username: 1, name: 1 })
  res.json(cheque)
})*/

userRouter.post('/', async (req: Request, res: Response) => {
  //const user = request.user
  const reqbody = req.body
  console.log(reqbody)

  const passwordHash = await bcrypt.hash(reqbody.password, 10)

  const user = new UserModel({
    name: reqbody.name,
    username: reqbody.username,
    passwordHash: passwordHash
  })

  const newUser = await user.save()

  res.status(201).json(newUser)
})

/*
custRouter.put('/:id', customerParser, async (req: Request, res: Response) => {
  //const user = request.user <, {}, MCustomerType>
  const reqbody: MCustomerType = req.body
  console.log(reqbody)

  let customerToUpdate = await CustomerModel.findById(req.params.id)

  if (!customerToUpdate) {
    res.status(400).json({ error: 'Invalid blog ID' })
  } else {
    customerToUpdate.set(reqbody)
    const newCustomer = await customerToUpdate.save()
    res.status(201).json(newCustomer)
  }
})

custRouter.delete('/:id', async (req: Request, res: Response) => {
  //const deletedCustomer = 
  await CustomerModel.findByIdAndDelete(req.params.id)
  //if (deletedCustomer) res.status(404).send("Could not find customer")
  res.status(201).send()
})
*/
userRouter.use(errorMiddleware)

export default userRouter