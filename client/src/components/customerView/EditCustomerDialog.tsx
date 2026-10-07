import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { CustomerType } from '../../../types.ts';

import { useCustomers } from '../../hooks/useCustomers.ts';


const EditCustomerDialog = ({ openDialog, handleClose, customer} : { openDialog: boolean, handleClose: () => void, customer: CustomerType }) => {

  const [customerName, setCustomerName] = useState(customer.name);
  const [customerPhone, setCustomerPhone] = useState(customer.phone);
  const [customerEmail, setCustomerEmail] = useState(customer.email);
  const [customerAddress, setCustomerAddress] = useState(customer.address);
  const [customerNotes, setCustomerNotes] = useState(customer.notes);

  const [errMsg, setErrMsg] = useState("")

  const notify = (msg: string) => {
    setErrMsg(msg)
    setTimeout(() => {
      setErrMsg('')
    }, 4500)
  }

  const { updateCustomer } = useCustomers()
  
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await updateCustomer({
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: customerAddress,
        notes: customerNotes,
        id: customer.id
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log("cheqeue form: Customer creation error: ", error.message)
        notify("cheqeue form: Customer creation error: " + error.message)
      }
      console.log("cheque form: UNKNOWN Customer creation error", error)
      notify("cheqeue form: Customer creation error: " + error)

    }
    handleClose();
  };

/***
 * Light grey text for dialog
 * <DialogContentText>
            Please enter the new realisation date
          </DialogContentText>
 */
  return (
    <React.Fragment>
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth='md' >
        <DialogTitle  >Edit Customer Details</DialogTitle>
        <DialogContent sx={{ paddingTop: '10px !important' }}>
          {
            errMsg && <Alert>{errMsg}</Alert>
          }
          <form onSubmit={handleSubmit} id="edit-customer-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '60vw' }}>
            
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
              multiline
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="edit-customer-form">
            Save Details
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditCustomerDialog