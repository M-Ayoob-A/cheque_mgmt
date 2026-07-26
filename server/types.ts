import { z } from 'zod';

export const ChequeSchema = z.object({
  //id: z.string(),
  amount: z.number(),
  customer: z.string(),
  //submitted: z.boolean(),
  agent: z.string(),
  bank: z.string(),
  issue_date: z.iso.date(),
  realisation_date: z.iso.date()
})

//export type ChequeType = z.infer<typeof ChequeSchema>;

export const CustomerSchema = z.object({
  //id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  notes: z.string()
  //cheques: z.string()
})

//export type CustomerType = z.infer<typeof CustomerSchema>;

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}