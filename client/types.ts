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

export type ChequeFormType = Omit<ChequeType, "id" | "submitted">;

export interface CustomerType {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export type CustomerFormType = Omit<CustomerType, "id">;