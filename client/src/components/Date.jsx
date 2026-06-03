import { useEffect } from 'react'
import chequeService from '../services/cheques'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Date = () => {

  const [data, setData] = useState([])

  const navigate = useNavigate()

  
  useEffect(() => {
    chequeService.getCheques().then(res => {
      setData(res)
      console.log(res[0])
    })
  }, [])
  
  return (
    <>
      <Typography>
        <h2>Cheques to be realised</h2>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.length
                ? data.map(ch => <TableRow>
                    <TableCell>{ch._id}</TableCell>
                    <TableCell>{ch.customer}</TableCell>
                    <TableCell>{ch.amount}</TableCell>
                    <TableCell>{ch.issue_date}</TableCell>
                    <TableCell>{ch.submitted ? "Submitted" : "Pending submission"}</TableCell>
                    <TableCell>
                      <Button color='primary' variant='contained' onClick={() => {navigate(`/cheque/${ch._id}`)}} >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  )
                : <div>No cheques realisable today</div>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Date

