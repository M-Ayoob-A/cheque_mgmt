import { useNavigate } from "react-router";
import { useState } from "react";

import chequeService from "../services/chequeServiceClient.ts";
import customerService from "../services/customerServiceClient.ts";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChequeType } from "../../types.ts";
import { Alert, Box } from "@mui/material";

interface chequeFormTools {
  cheques: ChequeType[];
  setCheques: React.Dispatch<React.SetStateAction<ChequeType[]>>;
}

const ChequeForm = ({ cheques, setCheques } : chequeFormTools) => {
  // customer details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // cheque details
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState(0);
  const [realDate, setRealDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [agent, setAgent] = useState("");

  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate();

  const notify = (msg: string) => {
    setErrMsg(msg)
    setTimeout(() => {
      setErrMsg('')
    }, 4500)
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newCustomerResult = await customerService.createNew({
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: customerAddress,
        notes: customerNotes,
      })

      const newChequeResult = await chequeService.createNew({
        customer: newCustomerResult.id,
        bank: bank,
        amount: amount,
        realisation_date: realDate,
        issue_date: issueDate,
        agent: agent,
      })

      // EDIT FOLLOWING:
      setCheques(cheques.concat(newChequeResult));
      // TANSTACK - add to chequelist
      //option 2 - zustand
    } catch (error) {
      if (error instanceof Error) {
        console.log("cheqeue form: Customer creation error: ", error.message)
        notify("cheqeue form: Customer creation error: " + error.message)
      }
      console.log("cheqeue form: UNKNOWN Customer creation error", error)
      notify("cheqeue form: Customer creation error: " + error)

    }

    navigate("/");
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} >
      <Typography variant="h5">Create a new Cheque</Typography>

      {
        errMsg && <Alert>{errMsg}</Alert>
      }

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '60vw' }}>
        <Typography variant="h6">Customer Details</Typography>
        <TextField
          label="Name"
          value={customerName}
          onChange={({ target }) => setCustomerName(target.value)}
        />
        <TextField
          label="Phone"
          value={customerPhone}
          onChange={({ target }) => setCustomerPhone(target.value)}
        />
        <TextField
          label="Email"
          value={customerEmail}
          onChange={({ target }) => setCustomerEmail(target.value)}
        />
        <TextField
          label="Address"
          value={customerAddress}
          onChange={({ target }) => setCustomerAddress(target.value)}
        />
        <TextField
          label="Notes"
          value={customerNotes}
          onChange={({ target }) => setCustomerNotes(target.value)}
        />

        <Typography variant="h6">Cheque Details</Typography>
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
          label="Issue Date"
          value={issueDate}
          onChange={({ target }) => setIssueDate(target.value)}
        />
        <TextField
          label="Realisation Date"
          value={realDate}
          onChange={({ target }) => setRealDate(target.value)}
        />
        <TextField
          label="agent"
          value={agent}
          onChange={({ target }) => setAgent(target.value)}
        />
        <Button type="submit" variant="contained" style={{ width: '50%' }}>
          Create
        </Button>
        <Button onClick={() => navigate("/")} variant="outlined" color="error" style={{ width: '50%' }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default ChequeForm;


// create new cust and new cheque - one go
// new cust then new cheque