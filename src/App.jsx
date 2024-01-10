import React, { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import "./App.css";
import Heading from "./Heading.jsx";
import Body from "./Body.jsx";
import Country from "./country.jsx";

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
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/Country/:Id" element={<Country />} />
        </Routes>
      </mycontext.Provider>
    </>
  );
}

export { App, mycontext };
