import { ChequeModel, type MChequeType } from '../models/cheque.ts';
//import { type ChequeType } from '../types.ts' 
import express, { /*type NextFunction,*/ type Response, type Request } from 'express';

const chequeRouter = express.Router()

chequeRouter.get('/', async (_req: Request, res: Response<MChequeType[]>) => {
  // query params are date, company
  //res.json(data.chequeData)
  const cheques = await ChequeModel.find({})//.populate('user', { username: 1, name: 1 })
  res.json(cheques)
})

chequeRouter.get('/:id', async (req, res) => {
  const cheque = await ChequeModel.find({ 'id' : req.params.id })//.populate('user', { username: 1, name: 1 })
  res.json(cheque)
})

chequeRouter.post('/', async (req, res) => {
  //const user = request.user
  const reqbody = req.body
  console.log(reqbody)

  const cheque = new ChequeModel({
    amount: reqbody.amount,
    customer: reqbody.customer,
    submitted: reqbody.submitted,
    agent: reqbody.agent,
    bank: reqbody.bank,
    realisation_date: reqbody.realisation_date,
    issue_date: reqbody.issue_date
  })

  const newCheque = await cheque.save()

  // TODO: Create new customer account if not already present
  
  // chequeWithCustomerDetails = await newCheque.populate('customer')
  res.status(201).json(newCheque)
})

export default chequeRouter