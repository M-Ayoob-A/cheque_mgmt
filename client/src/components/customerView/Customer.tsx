import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { CustomerType } from '../../../types.ts'
import EditCustomerDialog from './EditCustomerDialog.tsx';
import { useState } from 'react';

const Customer = ({ cust }: { cust: CustomerType | undefined }) => {
  
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  if(!cust) {
    return <><div>nothing found</div></>
  }

  return (
    <>
      <Typography variant='h5'>  
        {cust.name}
      </Typography>
      <TableContainer >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Customer ID</TableCell>
              <TableCell>{cust.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Phone Number</TableCell>
              <TableCell>{cust.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Email</TableCell>
              <TableCell>{cust.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Address</TableCell>
              <TableCell>{cust.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Notes</TableCell>
              <TableCell>{cust.notes}</TableCell>
            </TableRow>            
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleOpenDialog} >Edit Customer Details</Button>
      <EditCustomerDialog openDialog={openDialog} handleClose={handleCloseDialog} customer={cust} />

    </>
  )
}

export default Customer