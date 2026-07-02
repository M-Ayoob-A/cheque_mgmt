import axios from "axios"
const baseUrl = 'http://localhost:3000'


const getCustomers = async () => {
  const customers = await axios.get(baseUrl + "/customers")
  return customers.data
}

export default { getCustomers }