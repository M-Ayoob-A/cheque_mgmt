import { ChequeModel, type MChequeType } from '../models/cheque.ts';
import { ChequeSchema } from '../types.ts' 
import express, { type Response, type Request, type NextFunction } from 'express';
import { CustomerModel } from '../models/customer.ts';
import errorMiddleware from '../middleware/errorMiddleware.ts';

const chequeParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    ChequeSchema.parse(req.body)
    next()
  } catch (err: unknown) {
    next(err)
  }
}

const chequeRouter = express.Router()

chequeRouter.get('/', async (_req: Request, res: Response<MChequeType[]>) => {
  // query params are date, company
  //res.json(data.chequeData)
  const cheques = await ChequeModel.find({}).populate('customer', { name: 1, id: 1})
  
  res.json(cheques)
})

chequeRouter.get('/:id', async (req: Request, res: Response) => {
  const cheque = await ChequeModel.find({ 'id' : req.params.id }).populate('customer', { name: 1, id: 1})//{ name: 1 })
  res.json(cheque)
})

chequeRouter.post('/', chequeParser, async (req: Request, res: Response) => {
  //const user = request.user
  const reqbody = req.body
  console.log(reqbody)

  const cheque = new ChequeModel({
    amount: reqbody.amount,
    customer: reqbody.customer,
    submitted: false,
    agent: reqbody.agent,
    bank: reqbody.bank,
    realisation_date: reqbody.realisation_date,
    issue_date: reqbody.issue_date
  })

  const newCheque = await cheque.save()

  /*const cust = await CustomerModel.find({ 'name' : reqbody.customer });

  if (!cust)*/

  // TODO: Create new customer account if not already present
  
  // chequeWithCustomerDetails = await newCheque.populate('customer')
  res.status(201).json(newCheque)
})



chequeRouter.put('/:id/realdate', async (req: Request, res: Response) => {
  //const user = request.user
  const newdate = req.body.date
  console.log(newdate)

  let chequeToUpdate = await ChequeModel.findById(req.params.id)

  if (!chequeToUpdate) {
    res.status(400).json({ error: 'Invalid cheque ID' })
  } else {
    chequeToUpdate.realisation_date = newdate
    const newCheque = await chequeToUpdate.save()
    res.status(201).json(newCheque)
  }
})

chequeRouter.put('/:id/submit', async (req: Request, res: Response) => {
  //const user = request.user
  
  let chequeToUpdate = await ChequeModel.findById(req.params.id)

  if (!chequeToUpdate) {
    res.status(400).json({ error: 'Invalid cheque ID' })
  } else if (chequeToUpdate.submitted) {
    res.status(400).json({ error: 'Cheque already marked as submitted' })
  } else {
    chequeToUpdate.submitted = true
    const newCheque = await chequeToUpdate.save()
    res.status(201).json(newCheque)
  }
})

chequeRouter.delete('/:id', async (req: Request, res: Response) => {
  const deletedCheque = await ChequeModel.findByIdAndDelete(req.params.id);
  if (!deletedCheque) {
    res.status(404).send("Could not find document")
    return
  };
  
  const remainingCheques = await ChequeModel.find({ customer: deletedCheque.customer })
  
  if (!remainingCheques.length) await CustomerModel.findByIdAndDelete(deletedCheque.customer)
  
  res.status(201).send("Successfully deleted")
  /*await ChequeModel.findByIdAndDelete(req.params.id)
  //if (deletedCustomer) res.status(404).send("Could not find customer")
  res.status(201).send()*/
})

chequeRouter.use(errorMiddleware)

export default chequeRouter
