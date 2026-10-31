import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//import { ChequeType } from '../../../types.ts'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ChangeRealDateDialog from './ChangeRealDateDialog.tsx';
import { useCheques } from '../../hooks/useCheques.ts';
import { useParams } from 'react-router';
import { Container } from '@mui/material';

const Cheque = (/*{ ch }: { ch : ChequeType | undefined }*/) => {
  
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false);

  const { chequeid } = useParams();

  const { cheques, deleteCheque } = useCheques()

  const ch = chequeid && cheques
    ? cheques.find((c) => c.id === chequeid)
    : undefined;

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  if(!ch) {
    return <></>
  }

  const handleDelete = async () => {
    try {
      await deleteCheque(ch.id)
      navigate("/")
    } catch (err) {
      if (err instanceof Error) {
        console.log("cheqeue form: Customer creation error: ", err.message)
      }
      console.log("cheqeue form: UNKNOWN Customer creation error: ", err)
    }

  }

  return (
    <>
      <Container>
        <Typography variant="h5">
          Cheque from {ch.customer ? ch.customer.name : "Unknown Customer"}
        </Typography>
        <TableContainer >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} >Cheque ID</TableCell>
                <TableCell>{ch.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} >Cheque No.</TableCell>
                <TableCell>{ch.number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} >Customer</TableCell>
                <TableCell>{ch.customer ? ch.customer.name : "Not Found"}</TableCell>
                <TableCell>
                  <Button disabled={!ch.customer} onClick={() => {navigate(`/customer/${ch.customer ? ch.customer.id : ""}`)}} >
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
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} >Bank Branch</TableCell>
                <TableCell>{ch.branch}</TableCell>
              </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleDelete} color='error' >
          Delete Cheque Record
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          //sx={{ marginTop: '50px' }}
        >
          Back
        </Button>
        <ChangeRealDateDialog openDialog={openDialog} handleClose={handleCloseDialog} id={ch.id} />
      </Container>
    </>
  )
}

export default Cheque