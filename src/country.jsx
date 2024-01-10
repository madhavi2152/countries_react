import { useEffect, useState } from "react";
import { useContext } from "react";
import { mycontext } from "./App";
import { Link, useParams } from "react-router-dom";
import "./App.css"; // Import the CSS file

async function fetchCountry(Id) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${Id}`);
  const data = await res.json();
  return data[0];
}

function Country() {
  const { Id } = useParams();
  const [Country, setCountry] = useState(null);
  let mode = useContext(mycontext);
  useEffect(() => {
    fetchCountry(Id).then((data) => {
      setCountry(data);
    });
  }, [Id]);

  let name,
    native,
    flag,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    border;

  if (Country !== null) {
    native =
      Country.name.nativeName !== undefined
        ? Object.values(Object.keys(Country.name.nativeName)).map(
            (row) => Country.name.nativeName[row].common
          ) ?? "undefined"
        : "undefined";
    name = Country.name.common ?? "undefined";
    native = native[0] ?? "undefined";
    flag = Country.flags.png ?? "undefined";
    population = Country.population ?? "undefined";
    region = Country.region ?? "undefined";
    subregion = Country.subregion ?? "undefined";
    capital = Country.capital ?? ["undefined"]; // array
    tld = Country.tld[0] ?? "undefined";
    currencies =
      Country.currencies !== undefined
        ? Object.keys(Country.currencies).map(
            (row) => Country.currencies[row].name
          ) ?? "undefined"
        : ["undefined"]; // array
    languages =
      Country.languages !== undefined
        ? Object.values(Country.languages) ?? "undefined"
        : ["undefined"]; // array
    border =
      Country.borders !== undefined
        ? Object.values(Country.borders) ?? "undefined"
        : ["undefined"]; // array
  }

  return Country !== null ? (
    <>
      <div
        style={{
          fontFamily: "Nunito Sans",
          height: "100vh",
          backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
          color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        }}
      >
        <Link to="/">
          <button
            style={{
              border: "1px solid black",
              margin: "100px",
              marginLeft: "200px",
              width: "100px",
              height: "50px",
              padding: 0,
              textDecoration: "none",
              background: "none",
              cursor: "pointer",
              border: mode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            }}
          >
            {"<--     "}
            back{" "}
          </button>
        </Link>
        <div
          style={{
            display: "flex",
            lineHeight: "30px",
            marginLeft: "200px",
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
          }}
        >
          <div
            style={{
              width: "400px",
              backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            }}
          >
            <img src={flag} alt={`${name} flag`} />
          </div>
          <h1
            className="bold-label"
            style={{ marginTop: "-40px", marginLeft: "30px" }}
          >
            {name}
          </h1>
          <div
            style={{
              // height: "200px",
              backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              display: "flex",
              marginTop: "30px",
              marginLeft: "-50px",
            }}
          >
            <div>
              <p>
                <strong className="bold-label">Population:</strong>
                {native}
              </p>
              <p>
                <strong className="bold-label">Population:</strong> {population}
              </p>
              <p>
                <strong className="bold-label">Region:</strong> {region}
              </p>
              <p>
                <strong className="bold-label">Subregion:</strong> {subregion}
              </p>
              <p>
                <strong className="bold-label">Capital:</strong>{" "}
                {Array.isArray(capital) ? capital.join(", ") : "N/A"}
              </p>
            </div>
            <div style={{ marginLeft: "70px" }}>
              <p>
                <strong className="bold-label">TLD:</strong> {tld}
              </p>
              <p>
                <strong className="bold-label">Currencies:</strong>{" "}
                {currencies.join(", ")}
              </p>
              <p>
                <strong className="bold-label">Languages:</strong>{" "}
                {languages.join(", ")}
              </p>
            </div>
          </div>
        </div>
        <p style={{ marginLeft: "640px", marginTop: "20px" }}>
          <strong className="bold-label">Borders:</strong> {border.join(", ")}
        </p>
      </div>
    </>
  ) : (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
          color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        }}
      >
        <Link to="/">
          <button
            style={{
              border: "1px solid black",
              margin: "100px",
              marginLeft: "200px",
              width: "100px",
              height: "50px",
              padding: 0,
              textDecoration: "none",
              background: "none",
              cursor: "pointer",
              border: mode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            }}
          >
            {"<--     "}
            back{" "}
          </button>
        </Link>
        <div
          style={{
            display: "flex",
            lineHeight: "30px",
            marginLeft: "200px",
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
          }}
        >
          <div
            style={{
              // height: "400px",
              width: "400px",
              backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            }}
          ></div>
          <h1
            className="bold-label"
            style={{ marginTop: "-40px", marginLeft: "30px" }}
          ></h1>
          <div
            style={{
              // height: "200px",
              backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              display: "flex",
              marginTop: "30px",
              marginLeft: "-50px",
            }}
          >
            <div>
              <p>
                <strong className="bold-label">Population:</strong>
              </p>
              <p>
                <strong className="bold-label">Population:</strong>
              </p>
              <p>
                <strong className="bold-label">Region:</strong>
              </p>
              <p>
                <strong className="bold-label">Subregion:</strong>
              </p>
              <p>
                <strong className="bold-label">Capital:</strong>
              </p>
            </div>
            <div style={{ marginLeft: "70px" }}>
              <p>
                <strong className="bold-label">TLD:</strong>
              </p>
              <p>
                <strong className="bold-label">Currencies:</strong>{" "}
              </p>
              <p>
                <strong className="bold-label">Languages:</strong>{" "}
              </p>
            </div>
          </div>
        </div>
        <p style={{ marginLeft: "640px", marginTop: "20px" }}>
          <strong className="bold-label">Borders:</strong>
        </p>
      </div>
    </>
  );
}

export default Country;
