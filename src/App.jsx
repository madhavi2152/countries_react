import React, { createContext, useState } from "react";
import "./index.css";
import "./App.css";
import Heading from "./Heading.jsx";
import Body from "./Body.jsx";
import Country from "./country.jsx";
import CountryUndefined from "./CountryUndefined.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
let mycontext = React.createContext();
function App() {
  let [mode, setMode] = useState(true);

  return (
    <>
      <mycontext.Provider value={mode}>
        <Heading
          darkmode={() => {
            setMode((prev) => !prev);
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/Country/:Id" element={<Country />} />
            <Route path="/Country/undefined" element={<CountryUndefined />} />
          </Routes>
        </BrowserRouter>
      </mycontext.Provider>
    </>
  );
}

export { App, mycontext };
