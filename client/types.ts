export interface ChequeType {
  id: string;
  amount: number;
  customer: string;
  submitted: boolean;
  agent: string;
  bank: string;
  issue_date: string;
  realisation_date: string;
}

export type ChequeFormType = Omit<ChequeType,
                                  "id" | "submitted" | 
                                  "agent" | "issue_date">;

export interface CustomerType {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  cheques: string;
}