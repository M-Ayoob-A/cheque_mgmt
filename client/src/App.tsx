import { useState, useEffect } from "react";
import { Route, Routes, useMatch } from "react-router";
import chequeService from "./services/chequeServiceClient.ts";
import customerService from "./services/customerServiceClient.ts";

import { ChequeType, CustomerType } from "../types.ts";

import Date from "./components/Date";
import Cheque from "./components/Cheque";
import Customer from "./components/Customer";
import ChequeForm from "./components/ChequeForm";

function App() {
  const [chequeData, setChequeData] = useState<ChequeType[]>([]);
  const [customerData, setCustomerData] = useState<CustomerType[]>([]);

  useEffect(() => {
    chequeService.getCheques().then((res) => {
      setChequeData(res);
      //console.log(res[0])
    });
    customerService.getCustomers().then((res) => {
      setCustomerData(res);
      console.log(res[0])
      console.log(res)

    });
  }, []);

  const match1 = useMatch("/cheque/:chequeid");
  const cheque = match1
    ? chequeData.find((c) => c.id === match1.params.chequeid)
    : undefined;

  const match2 = useMatch("/customer/:custid");
  const cust = match2
    ? customerData.find((c) => c.id === match2.params.custid)
    : undefined;

  console.log(chequeData)
  return (
    <>
      <Routes>
        <Route path="/" element={<Date />} />
        <Route path="/date/:dateid" />
        <Route path="/customer/:custid" element={<Customer cust={cust} />} />
        <Route path="/cheque/:chequeid" element={<Cheque ch={cheque} />} />
        <Route path="/newcheque" element={<ChequeForm cheques={chequeData} setCheques={setChequeData} />} />
      </Routes>
    </>
  );
}

export default App;

/*

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

<section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>




*/
