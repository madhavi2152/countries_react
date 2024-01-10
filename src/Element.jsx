import { useContext } from "react";
import { mycontext } from "./App";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Element(props) {
  let mode = useContext(mycontext);
  return (
    <div
      className="contentdata"
      style={{
        backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
        color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        marginRight: "30px",
      }}
    >
      <img src={props.flag}></img>
      <p className="country name"> {props.name}</p>
      <p className="Population">
        Population: <span id="Population">{props.population}</span>
      </p>
      <p className="Region">
        Region: <span id="Region">{props.region}</span>
      </p>
      <p className="Capital">
        Capital: <span id="Capital">{props.capital}</span>
      </p>
    </div>
  );
}
export default Element;
