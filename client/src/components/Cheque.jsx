//import { useParams } from "react-router"

import Typography from "@mui/material/Typography"

const Cheque = ({ ch }) => {

  /*const ch = {
    "_id": "6a19717d904bd8a49ddb7606",
    "submitted": false,
    "amount": "$1,271.43",
    "agent": "Rosetta Daugherty",
    "customer": "Espinoza Sears",
    "bank": "MEDALERT",
    "issue_date": "2026-03-19",
    "realisation_date": "2027-02-03"
  }*/
  if(!ch) {
    return <></>
  }

  return (
    <>
      <Typography>
      <h3>Cheque from {ch.customer}</h3>
      <div style={{ display: "flex", gap:'10px' }}>
        <div>Cheque ID:</div>
        <div>{ch._id}</div>
      </div>
      <div style={{ display: "flex", gap:'10px' }}>
        <div>Issue Date:</div>
        <div>{ch.issue_date}</div>
      </div>
      <div style={{ display: "flex", gap:'10px' }}>
        <div>Status:</div>
        <div>{ch.submitted ? "Submitted" : "Not realised"}</div>
      </div>
      <div style={{ display: "flex", gap:'10px' }}>
        <div>Customer:</div>
        <div>{ch.customer}</div>
      </div>
      <div style={{ display: "flex", gap:'10px' }}>
        <div>Agent:</div>
        <div>{ch.agent}</div>
      </div>
      <div style={{ display: "flex", gap:'10px' }}>
        <div>Bank:</div>
        <div>{ch.bank}</div>
      </div>
      <button>Change realisation date</button>
      </Typography>
    </>
  )
}

export default Cheque