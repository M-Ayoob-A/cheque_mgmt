import { Route, Routes, useMatch } from "react-router";

import Date from "./components/Date";
import Cheque from "./components/chequeView/Cheque.tsx";
import Customer from "./components/customerView/Customer.tsx";
import ChequeForm from "./components/ChequeForm";

import { useCheques } from "./hooks/useCheques.ts";
import { useCustomers } from "./hooks/useCustomers.ts";

function App() {
  const { cheques } = useCheques()
  const { customers } = useCustomers()

  const match1 = useMatch("/cheque/:chequeid");
  // Can sidestep useMatch by obtaining the required cheque/customer in the relevant component - would (?) still
  // require a similar check to the following tho, with useParams or smthn 
  const cheque = match1 && cheques
    ? cheques.find((c) => c.id === match1.params.chequeid)
    : undefined;

  const match2 = useMatch("/customer/:custid");
  const cust = match2 && customers
    ? customers.find((c) => c.id === match2.params.custid)
    : undefined;

  return (
    <>
      <Routes>
        <Route path="/" element={<Date />} />
        <Route path="/date/:dateid" />
        <Route path="/customer/:custid" element={<Customer cust={cust} />} />
        <Route path="/cheque/:chequeid" element={<Cheque ch={cheque} />} />
        <Route path="/newcheque" element={<ChequeForm />} />
      </Routes>
    </>
  );
}

export default App;
