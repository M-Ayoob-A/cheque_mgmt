import { Route, Routes } from "react-router";

import Date from "./components/Date";
import Cheque from "./components/chequeView/Cheque.tsx";
import Customer from "./components/customerView/Customer.tsx";
import ChequeForm from "./components/ChequeForm";
import HeaderBar from "./components/HeaderBar.tsx";
//import { useCheques } from "./hooks/useCheques.ts";
//import { useCustomers } from "./hooks/useCustomers.ts";
import { useEffect, useState } from "react";
import useLoggedInUser from "./zustand/zustand.ts";
import { UserDetailsType } from "../types.ts";
import Login from "./components/Login.tsx";
import { Box, CircularProgress } from "@mui/material";

function App() {
  //
  const [loading, setLoading] = useState(true)

  const user = useLoggedInUser((state) => state.user)
  const setUser = useLoggedInUser((state) => state.setUser)

  useEffect(() => {
    const prevUserString = localStorage.getItem("chequesAppUser")
    const prevUser: UserDetailsType | null = prevUserString ? JSON.parse(prevUserString) : null
    if (prevUser) setUser(prevUser)
    setLoading(false)
  }, [])
  
  console.log(loading)

  if (loading) {
    return <Box sx={{ width: '100vw', height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress sx={{ minWidth: '200px', minHeight: '200px' }} />
    </Box>
  }

  return (
    <>
      <div>
        {
          user
          ? <>
              <HeaderBar/>
              <Routes>
                <Route path="/" element={<Date />} />
                <Route path="/date/:dateid" />
                <Route path="/customer/:custid" element={<Customer />} />
                <Route path="/cheque/:chequeid" element={<Cheque />} />
                <Route path="/newcheque" element={<ChequeForm />} />
              </Routes>
            </>
          : <Login />
        }
      </div>
    </>
  );
}

export default App;
