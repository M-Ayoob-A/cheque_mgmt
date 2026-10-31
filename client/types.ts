export interface ChequeType {
  id: string;
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

export interface LoginFormType {
  username: string;
  password: string;
}

export interface UserDetailsType {
  token: string;
  username: string;
  name: string;
}