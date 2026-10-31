import { z } from 'zod';

export const ChequeSchema = z.object({
  //id: z.string(),
  amount: z.number(),
  customer: z.string(),
  number: z.number(),
  //submitted: z.boolean(),
  agent: z.string(),
  bank: z.string(),
  branch: z.string(),
  notes: z.string(),
  issue_date: z.iso.date(),
  realisation_date: z.iso.date()
})

/**
  number: number;
  amount: number;
  customer: {
    name: string,
    id: string
  } | null;
  submitted: boolean;
  agent: string;
  bank: string;
  branch: string;
  issue_date: string;
  realisation_date: string;
  notes: string;
 */


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