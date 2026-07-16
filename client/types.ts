export interface ChequeType {
  id: string;
  amount: number;
  customer: {
    name: string,
    id: string
  } | null;
  submitted: boolean;
  agent: string;
  bank: string;
  issue_date: string;
  realisation_date: string;
}

export interface ChequeFormType extends Omit<ChequeType, "id" | "submitted" | "customer"> {
  customer: string
}

export interface CustomerType {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export type CustomerFormType = Omit<CustomerType, "id">;