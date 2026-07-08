import axios from "axios"
import { CustomerFormType, CustomerType } from "../../types"
const baseUrl = 'http://localhost:3000/api/customers'


const getCustomers = async () => {
  const customers = await axios.get(baseUrl)
  return customers.data
}

const createNew = async (newCustomerDetails: CustomerFormType): Promise<CustomerType> => {
  const newCustomer = await axios.post(baseUrl, newCustomerDetails)
  return newCustomer.data
}

export default { getCustomers, createNew }
