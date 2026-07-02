import { useNavigate } from "react-router"
import { useState } from "react"

import chequeService from "../services/cheques.ts"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const ChequeForm = () => {
  
  const [customer, setCustomer] = useState('')
  const [bank, setBank] = useState('')
  const [amount, setAmount] = useState(0)
  const [realDate, setRealDate] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    chequeService.createNew({
      customer: customer,
      bank: bank,
      amount: amount,
      realisation_date: realDate
    })
    navigate('/')
  }

  return (
    <>
      <Typography variant="h5">
        Create a new Cheque 
      </Typography>

      <form onSubmit={handleSubmit} >

        <TextField
          label="customer"
          value={customer}
          onChange={({ target }) => setCustomer(target.value)}
        />
        <TextField
          label="bank"
          value={bank}
          onChange={({ target }) => setBank(target.value)}
        />
        <TextField
          label="amount"
          value={amount}
          onChange={({ target }) => setAmount(Number(target.value))}
        />
        <TextField
          label="Realisation Date"
          value={realDate}
          onChange={({ target }) => setRealDate(target.value)}
        />
        <Button type="submit" variant="contained" >Create</Button>
      </form>
    </>
  )
}

export default ChequeForm
