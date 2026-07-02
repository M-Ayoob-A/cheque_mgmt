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
import { ChequeType } from '../../types';

const Date = () => {

  const [data, setData] = useState<ChequeType[]>([])

  const navigate = useNavigate()

  
  useEffect(() => {
    chequeService.getCheques().then(res => {
      setData(res)
      console.log(res[0])
    })
  }, [])
  
  return (
    <>
      <Typography variant="h5">
        Cheques to be realised
      </Typography>
      {
        data.length
          ? <TableContainer component={Paper}>
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
                    data.map(ch => <TableRow key={ch.id} >
                        <TableCell>{ch.id}</TableCell>
                        <TableCell>{ch.customer}</TableCell>
                        <TableCell>{ch.amount}</TableCell>
                        <TableCell>{ch.issue_date}</TableCell>
                        <TableCell>{ch.submitted ? "Submitted" : "Pending submission"}</TableCell>
                        <TableCell>
                          <Button color='primary' variant='contained' onClick={() => {navigate(`/cheque/${ch.id}`)}} >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          : <div>No cheques realisable today</div>
      }
      
    </>
  )
}

export default Date

