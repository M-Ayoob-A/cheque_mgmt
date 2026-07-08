import { CustomerModel, type MCustomerType } from '../models/customer.ts';
//import { type ChequeType } from '../types.ts' 
import express, { /*type NextFunction,*/ type Response, type Request } from 'express';
//import { CustomerModel } from '../models/customer.ts';

const custRouter = express.Router()

custRouter.get('/', async (_req: Request, res: Response<MCustomerType[]>) => {
  const customers = await CustomerModel.find({})//.populate('user', { username: 1, name: 1 })
  res.json(customers)
})

custRouter.get('/:id', async (req, res) => {
  const cheque = await CustomerModel.find({ 'id' : req.params.id })//.populate('user', { username: 1, name: 1 })
  res.json(cheque)
})

custRouter.post('/', async (req, res) => {
  //const user = request.user
  const reqbody = req.body
  console.log(reqbody)

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

export default custRouter