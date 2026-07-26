import axios from "axios"
import { CustomerFormType, CustomerType } from "../../types"
const baseUrl = 'http://localhost:3000/api/customers'
//const baseUrl = 'https://jubilant-acorn-x5wpjr4qpq452vppw-3000.app.github.dev/api/customers'

let token = ''

export const setCustomerRoutesToken = (newToken: string) => {
  token = 'Bearer ' + newToken
}

const getCustomers = async (): Promise<CustomerType[]> => {
  const config = {
    headers: { Authorization: token }
  }

  const customers = await axios.get(baseUrl, config)
  return customers.data
}

const createNew = async (newCustomerDetails: CustomerFormType): Promise<CustomerType> => {
  const config = {
    headers: { Authorization: token }
  }

  const newCustomer = await axios.post(baseUrl, newCustomerDetails, config)
  return newCustomer.data
}

const updateCustomer = async (newCustomerDetails: CustomerType): Promise<CustomerType> => {
  const config = {
    headers: { Authorization: token }
  }

  const newCustomer = await axios.put(`${baseUrl}/${newCustomerDetails.id}`, newCustomerDetails, config)
  return newCustomer.data
}

export default { getCustomers, createNew, updateCustomer }
