import axios from "axios"
import { ChequeFormType, ChequeType } from "../../types"
const baseUrl = 'http://localhost:3000/api/cheques'


const getCheques = async (): Promise<ChequeType[]> => {
  const cheques = await axios.get(baseUrl)
  return cheques.data
}

const createNew = async (newChequeDetails: ChequeFormType): Promise<ChequeType> => {
  const newCheque = await axios.post(baseUrl, newChequeDetails)
  return newCheque.data
}

export default { getCheques, createNew }