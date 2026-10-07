import { ChequeModel, type MChequeType } from '../models/cheque.ts';
import { ChequeSchema } from '../types.ts' 
import express, { type Response, type Request, type NextFunction } from 'express';
import { CustomerModel } from '../models/customer.ts';
import errorMiddleware from '../middleware/errorMiddleware.ts';
import tokenExtractor from '../middleware/tokenExtractor.ts';

const chequeParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    ChequeSchema.parse(req.body)
    next()
  } catch (err: unknown) {
    next(err)
  }
}

const chequeRouter = express.Router()

chequeRouter.use(tokenExtractor)

chequeRouter.get('/', async (_req: Request, res: Response<MChequeType[]>) => {
  // query params are date, company
  //res.json(data.chequeData)
  const cheques = await ChequeModel.find({}).populate('customer', { name: 1, id: 1})
  
  res.status(200).json(cheques)
})

chequeRouter.get('/:id', async (req: Request, res: Response) => {
  const cheque = await ChequeModel.findById(req.params.id)
  
  if (cheque) {
    res.status(200).json(cheque)
  } else {
    res.status(404).json({ error: "Cannot find cheque with the specified ID" })
  }
})

chequeRouter.post('/', chequeParser, async (req: Request, res: Response) => {
  //const user = request.user
  const reqbody = req.body

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
  res.status(201).json(newCheque)
})

chequeRouter.put('/:id/realdate', async (req: Request, res: Response) => {
  //const user = request.user
  const newdate = req.body.date

  const chequeToUpdate = await ChequeModel.findById(req.params.id)

  if (!chequeToUpdate) {
    res.status(404).json({ error: 'Invalid cheque ID' })
  } else {
    chequeToUpdate.realisation_date = newdate
    await chequeToUpdate.save()
    res.status(204).send("Successfully updated realisation date")
  }
})

chequeRouter.put('/:id/submit', async (req: Request, res: Response) => {
  //const user = request.user
  
  let chequeToUpdate = await ChequeModel.findById(req.params.id)

  if (!chequeToUpdate) {
    res.status(404).json({ error: 'Invalid cheque ID' })
  } else if (chequeToUpdate.submitted) {
    res.status(400).json({ error: 'Cheque already marked as submitted' })
  } else {
    chequeToUpdate.submitted = true
    await chequeToUpdate.save()
    res.status(204).send("Successfully updated cheque status")
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
  
  res.status(204).send("Successfully deleted")
  /*await ChequeModel.findByIdAndDelete(req.params.id)
  //if (deletedCustomer) res.status(404).send("Could not find customer")
  res.status(201).send()*/
})

chequeRouter.use(errorMiddleware)

export default chequeRouter
