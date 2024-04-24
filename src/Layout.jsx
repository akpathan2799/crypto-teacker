import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CurrencyContext } from "./Context/context.js";
import Header from "./Components/Header/Header.jsx";
import { Suspense } from "react";
const Layout = () => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, symbol, setSymbol }}
    >
      <Header />

      <Suspense fallback={<>Loading</>}>
        <Outlet />
      </Suspense>
    </CurrencyContext.Provider>
  );
};

export default Layout;
