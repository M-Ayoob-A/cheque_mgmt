import axios from "axios"
import { LoginFormType, UserDetailsType } from "../../types"
const baseUrl = 'http://localhost:3000/api/login'
//const baseUrl = 'https://jubilant-acorn-x5wpjr4qpq452vppw-3000.app.github.dev/api/customers'

const login = async (loginDetails: LoginFormType): Promise<UserDetailsType> => {
  const loginResponse = await axios.post(baseUrl, loginDetails)
  return loginResponse.data
}

export default { login }
