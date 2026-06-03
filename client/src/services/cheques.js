import axios from "axios"
const baseUrl = 'http://localhost:3000'


const getCheques = async () => {
  const cheques = await axios.get(baseUrl + "/cheques")
  return cheques.data
}

export default { getCheques }