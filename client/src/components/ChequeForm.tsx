import { useNavigate } from "react-router";
import { useState } from "react";
import { useCheques } from "../hooks/useCheques.ts";
import { useCustomers } from "../hooks/useCustomers.ts";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, Autocomplete, Box, FormControlLabel, Switch } from "@mui/material";

const ChequeForm = () => {
  // new/returning customer
  const [newCustomer, setNewCustomer] = useState(false)
  
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

  const { addCheque } = useCheques()
  const { customers, addCustomer } = useCustomers()

  const notify = (msg: string) => {
    setErrMsg(msg)
    setTimeout(() => {
      setErrMsg('')
    }, 4500)
  }

  const addChequeForReturningCustomer = async () => {
    const selectedCustomer = customers?.find(c => c.name)
    if (!selectedCustomer) throw new Error("Could not find the specified customer")
    await addCheque({
      customer: selectedCustomer.id,
      bank: bank,
      amount: amount,
      realisation_date: realDate,
      issue_date: issueDate,
      agent: agent
    })
  }

  const addChequeForNewCustomer = async () => {
    const TSQnewCustomer = await addCustomer({
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
      notes: customerNotes,
    })

    await addCheque({
      customer: TSQnewCustomer.id,
      bank: bank,
      amount: amount,
      realisation_date: realDate,
      issue_date: issueDate,
      agent: agent
    })
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      if (newCustomer) addChequeForNewCustomer()
      else addChequeForReturningCustomer()
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

        <FormControlLabel 
          control={
            <Switch checked={newCustomer} onChange={({ target }) => setNewCustomer(target.checked)} />
          } 
          label="New Customer"
        />

        {
          newCustomer
          ? <>
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
            </>
            : <Autocomplete
                options={customers ? customers : []}
                noOptionsText={customers ? "No matching customers" : "Loading data"}
                autoHighlight
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box
                      key={key}
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...optionProps}
                    >
                      {option.name} {"\u00A0\u00A0"}
                      <span style={{ color: 'grey', fontSize: '0.8rem' }} >{option.phone}</span>
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a customer"
                    slotProps={{
                      ...params.slotProps,
                      htmlInput: {
                        ...params.slotProps.htmlInput,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      },
                    }}
                  />
                )}
              />

        }
        

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

/**
 *   <RadioGroup
          //name="controlled-radio-buttons-group"
          value={returningCustomer}
          onChange={({ target }) => setReturningCustomer(target.value === "ret" ? true : false)}
        >
          <FormControlLabel value="ret" control={<Radio />} label="Returning Customer" />
          <FormControlLabel value="new" control={<Radio />} label="New Customer" />
        </RadioGroup>
 */