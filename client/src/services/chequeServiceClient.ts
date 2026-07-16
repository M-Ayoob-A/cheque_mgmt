import axios from "axios"
import { ChequeFormType, ChequeType } from "../../types"
const baseUrl = 'http://localhost:3000/api/cheques'
//const baseUrl = 'https://jubilant-acorn-x5wpjr4qpq452vppw-3000.app.github.dev/api/cheques'

const getCheques = async (): Promise<ChequeType[]> => {
  const cheques = await axios.get(baseUrl)
  return cheques.data
}

const createNew = async (newChequeDetails: ChequeFormType): Promise<ChequeType> => {
  const newCheque = await axios.post(baseUrl, newChequeDetails)
  return newCheque.data
}

const changeRealDate = async ({newdate, id} : {newdate: string, id: string}): Promise<ChequeType> => {
  const newCheque = await axios.put(`${baseUrl}/${id}/realdate`, { date: newdate })
  return newCheque.data
}

const submit = async (id: string): Promise<ChequeType> => {
  const newCheque = await axios.put(`${baseUrl}/${id}/submit`)
  return newCheque.data
}

const deleteCheque = async (id: string): Promise<void> => {
  const newCheque = await axios.delete(`${baseUrl}/${id}`)
  return newCheque.data
}

export default { getCheques, createNew, submit, changeRealDate, deleteCheque }