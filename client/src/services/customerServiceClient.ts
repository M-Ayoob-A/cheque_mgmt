import axios from "axios"
import { CustomerFormType, CustomerType } from "../../types"
const baseUrl = 'http://localhost:3000/api/customers'
//const baseUrl = 'https://jubilant-acorn-x5wpjr4qpq452vppw-3000.app.github.dev/api/customers'

const getCustomers = async (): Promise<CustomerType[]> => {
  const customers = await axios.get(baseUrl)
  return customers.data
}

const createNew = async (newCustomerDetails: CustomerFormType): Promise<CustomerType> => {
  const newCustomer = await axios.post(baseUrl, newCustomerDetails)
  return newCustomer.data
}

const updateCustomer = async (newCustomerDetails: CustomerType): Promise<CustomerType> => {
  const newCustomer = await axios.put(`${baseUrl}/${newCustomerDetails.id}`, newCustomerDetails)
  return newCustomer.data
}

export default { getCustomers, createNew, updateCustomer }
