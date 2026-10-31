import { useEffect } from "react";
import chequeService from "../services/chequeServiceClient";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCheques } from "../hooks/useCheques";

import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ChequeType } from "../../types";
import { Box, CircularProgress, Container, TextField } from "@mui/material";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Date = () => {
  const [data, setData] = useState<ChequeType[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRangeError, setDateRangeError] = useState(false);

  const { cheques, isPending } = useCheques()

  const navigate = useNavigate();

  useEffect(() => {
    chequeService.getCheques().then((res) => {
      setData(res);
    });
  }, []);

/*  useEffect(() => {
    setData(data.filter(ch => dayjs(ch.realisation_date).isSameOrAfter(dayjs(startDate))
                                  && dayjs(ch.realisation_date).isSameOrBefore(dayjs(endDate))));
  }, [startDate, endDate]);
*/
  if (isPending) {
    return <Box sx={{ width: '100vw', height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress sx={{ minWidth: '200px', minHeight: '200px' }} />
        </Box>
  }

  if (!cheques) {
    return <>no data</>
  }

  const applyDateRange = () => {
    if (startDate && endDate && dayjs(endDate).isSameOrAfter(dayjs(startDate))) {
      setData(data.filter(ch => {
        console.log(ch.realisation_date)
        console.log(startDate)
        console.log(endDate)
        console.log(dayjs(ch.realisation_date).isSameOrAfter(dayjs(startDate)))
        console.log(dayjs(ch.realisation_date).isSameOrBefore(dayjs(endDate)))
        return dayjs(ch.realisation_date).isSameOrAfter(dayjs(startDate))
          && dayjs(ch.realisation_date).isSameOrBefore(dayjs(endDate))
    
    
      }));

    } else {
      setDateRangeError(true)
    }
  }

  return (
    <>
      <Container>
        <Box>
          {
            // Buttons for page selection - should be exclusive, i.e. when one is selected, others aren't
          }
        </Box>
        <Typography variant="h5">Cheques to be realised ({cheques.length})</Typography>
        <br />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'roboto', width: '100%' }}>
          <div>Show cheques realisable from{'\u00A0'}</div>
          
          <TextField
            label="Start Date"
            value={startDate}
            type="date"
            size="small"
            onChange={({ target }) => { setStartDate(target.value); console.log(target.value) } }
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <div>{'\u00A0'}to{'\u00A0'}</div>
          <TextField
            label="End Date"
            value={endDate}
            type="date"
            size="small"
            onChange={({ target }) => { setEndDate(target.value); console.log(target.value) }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Box>
            <Button
              onClick={applyDateRange}
            >
              Apply date range
            </Button>
          </Box>
        </Box>
        {dateRangeError && <Box>Please enter a valid date range</Box>}
        <br />
        {cheques.length ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableRow>
                  <TableCell>Cheque No.</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Realisation Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((ch) => (
                  <TableRow key={ch.id}>
                    <TableCell>{ch.number}</TableCell>
                    <TableCell>{ch.customer ? ch.customer.name : "Not Found"}</TableCell>
                    <TableCell>{ch.issue_date.slice(0,10)}</TableCell>
                    <TableCell>{ch.realisation_date.slice(0,10)}</TableCell>
                    <TableCell>
                      {ch.submitted ? "Submitted" : "Pending submission"}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#e8e8e8' }}>{ch.amount}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          navigate(`/cheque/${ch.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ backgroundColor: '#e8e8e8' }}>{data.reduce((sum, ch) => sum + ch.amount, 0)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>No cheques realisable today</div>
        )}
        <Button
          onClick={() => {
            navigate("/newcheque");
          }}
          sx={{ marginTop: '50px' }}
        >
          Create New Cheque
        </Button>
      </Container>
    </>
  );
};

export default Date;
