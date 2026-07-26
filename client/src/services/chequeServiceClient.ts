import axios from "axios"
import { ChequeFormType, ChequeType } from "../../types"
//import useLoggedInUser from "../zustand/zustand.ts"
const baseUrl = 'http://localhost:3000/api/cheques'
//const baseUrl = 'https://jubilant-acorn-x5wpjr4qpq452vppw-3000.app.github.dev/api/cheques'

let token = ''

export const setChequeRoutesToken = (newToken: string) => {
  token = 'Bearer ' + newToken
}

const getCheques = async (): Promise<ChequeType[]> => {
  const config = {
    headers: { Authorization: token }
  }

  const cheques = await axios.get(baseUrl, config)
  return cheques.data
}

const createNew = async (newChequeDetails: ChequeFormType): Promise<ChequeType> => {
  const config = {
    headers: { Authorization: token }
  }
  
  const newCheque = await axios.post(baseUrl, newChequeDetails, config)
  return newCheque.data
}

const changeRealDate = async ({newdate, id} : {newdate: string, id: string}): Promise<ChequeType> => {
  const config = {
    headers: { Authorization: token }
  }
  
  const newCheque = await axios.put(`${baseUrl}/${id}/realdate`, { date: newdate }, config)
  return newCheque.data
}

const submit = async (id: string): Promise<ChequeType> => {
  const config = {
    headers: { Authorization: token }
  }
  
  const newCheque = await axios.put(`${baseUrl}/${id}/submit`, config)
  return newCheque.data
}

const deleteCheque = async (id: string): Promise<void> => {
  const config = {
    headers: { Authorization: token }
  }
  
  const newCheque = await axios.delete(`${baseUrl}/${id}`, config)
  return newCheque.data
}

export default { getCheques, createNew, submit, changeRealDate, deleteCheque }