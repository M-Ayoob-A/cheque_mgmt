import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ChangeRealDateDialog = ({ openDialog, handleClose } : { openDialog: boolean, handleClose: () => void }) => {

  const [newDate, setNewDate] = React.useState('')
  
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newDate);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Change Realisation Date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new realisation date
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="New Realisation Date"
              type="date"
              fullWidth
              variant="standard"
              value={newDate}
              onChange={({ target }) => setNewDate(target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Confirm New Date
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ChangeRealDateDialog