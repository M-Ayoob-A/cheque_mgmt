import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { ChequeType } from '../../types.ts'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ChangeRealDateDialog from './ChangeRealDateDialog.tsx';

const Cheque = ({ ch }: { ch : ChequeType | undefined }) => {
  
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  if(!ch) {
    return <></>
  }

  return (
    <>
      <Typography variant="h5">
        Cheque from {ch.customer}
      </Typography>
      <TableContainer >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Cheque ID</TableCell>
              <TableCell>{ch.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Customer</TableCell>
              <TableCell>{ch.customer}</TableCell>
              <TableCell>
                <Button onClick={() => {navigate(`/customer/${ch.customer}`)}} >
                  View Customer Details
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Amount</TableCell>
              <TableCell>{ch.amount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Issue Date</TableCell>
              <TableCell>{ch.issue_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Realisation Date</TableCell>
              <TableCell>{ch.realisation_date}</TableCell>
              <TableCell>
                <Button onClick={handleOpenDialog} >Change Realisation Date</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Status</TableCell>
              <TableCell>{ch.submitted ? "Submitted" : "Pending submission"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Agent</TableCell>
              <TableCell>{ch.agent}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} >Bank</TableCell>
              <TableCell>{ch.bank}</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
      <ChangeRealDateDialog openDialog={openDialog} handleClose={handleCloseDialog} />
    </>
  )
}

export default Cheque