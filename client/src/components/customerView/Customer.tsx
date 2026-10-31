import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//import { CustomerType } from '../../../types.ts'
import EditCustomerDialog from './EditCustomerDialog.tsx';
import { useState } from 'react';
import { useCustomers } from "../../hooks/useCustomers.ts";
import { useParams, useNavigate } from 'react-router';
import { Container } from '@mui/material';

const Customer = () => {
  
  const [openDialog, setOpenDialog] = useState(false);

  const { custid } = useParams();

  const navigate = useNavigate();

  const { customers } = useCustomers()

  const cust = custid && customers
    ? customers.find((c) => c.id === custid)
    : undefined;
  
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
      <Container>
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
        <Button
          onClick={() => {
            navigate(-1);
          }}
          sx={{ marginTop: '50px' }}
        >
          Back
        </Button>
        <EditCustomerDialog openDialog={openDialog} handleClose={handleCloseDialog} customer={cust} />
      </Container>
    </>
  )
}

export default Customer