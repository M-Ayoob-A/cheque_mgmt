import { CustomerModel, type MCustomerType } from '../models/customer.ts';
import express, { type NextFunction, type Response, type Request } from 'express';
import { CustomerSchema } from '../types.ts';
import errorMiddleware from '../middleware/errorMiddleware.ts';
import tokenExtractor from '../middleware/tokenExtractor.ts';

const customerParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    CustomerSchema.parse(req.body)
    next()
  } catch (err: unknown) {
    next(err)
  }
}

const custRouter = express.Router()

custRouter.use(tokenExtractor)

custRouter.get('/', async (_req: Request, res: Response<MCustomerType[]>) => {
  const customers = await CustomerModel.find({})//.populate('user', { username: 1, name: 1 })
  res.json(customers)
})

custRouter.get('/:id', async (req, res) => {
  const cheque = await CustomerModel.findById(req.params.id)
  if (cheque) res.status(200).json(cheque)
  else res.status(404).send("Could find customer with requested ID")
})

custRouter.post('/', customerParser, async (req, res) => {
  //const user = request.user
  const reqbody = req.body

  const customer = new CustomerModel({
    name: reqbody.name,
    phone: reqbody.phone,
    email: reqbody.email,
    address: reqbody.address,
    notes: reqbody.notes
  })

  const newCustomer = await customer.save()

  // TODO: Create new customer account if not already present
  
  // chequeWithCustomerDetails = await newCheque.populate('customer')
  res.status(201).json(newCustomer)
})


custRouter.put('/:id', customerParser, async (req: Request, res: Response) => {
  //const user = request.user <, {}, MCustomerType>
  const reqbody: MCustomerType = req.body

  let customerToUpdate = await CustomerModel.findById(req.params.id)

  if (!customerToUpdate) {
    res.status(400).json({ error: 'Invalid blog ID' })
  } else {
    customerToUpdate.set(reqbody)
    const newCustomer = await customerToUpdate.save()
    res.status(200).json(newCustomer)
  }
})

custRouter.delete('/:id', async (req: Request, res: Response) => {
  const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.id)
  if (deletedCustomer) res.status(204).send()
  else res.status(404).send("Could not find customer")
})

custRouter.use(errorMiddleware)

export default custRouter