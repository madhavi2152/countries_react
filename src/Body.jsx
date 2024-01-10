import Element from "./Element";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { mycontext } from "./App";
import { Link } from "react-router-dom";
function Body({ id }) {
  let mode = useContext(mycontext);
  const data = async () => {
    let res = await fetch("https://restcountries.com/v3.1/all");
    let resjson = await res.json();
    return resjson;
  };
  let sub = [{}, {}, {}, {}, {}];
  let [Flag, setFlag] = useState(false);
  let [countryData, setcountryData] = useState(null);
  let [searchFilter, setSearchFilter] = useState(null);
  let [Visibility, setVisibility] = useState(false);
  let [SubVisibility, setSubVisibility] = useState(false);
  let [searchRegion, setsearchRegion] = useState(null);
  let [subregion, setSubregion] = useState({
    Africa: [],
    Americas: [],
    Asia: [],
    Europe: [],
    Oceania: [],
  });
  let [SubRegionflag, setSubRegionflag] = useState(null);
  let [Population, setPopulation] = useState("none");
  let [Area, setArea] = useState("none");
  let [PopulationFlag, setPopulationFlag] = useState(false);
  let [AreaFlag, setAreaFlag] = useState(false);
  useEffect(() => {
    data().then((data) => {
      setcountryData(data);
      setFlag((prev) => !prev);
    });
  }, []);

  if (countryData !== null) {
    countryData = countryData.map((row) => {
      let flag = row.flags.png ?? "undefined";
      let name = row.name.common ?? "undefined";
      let population = row.population ?? "undefined";
      let region = row.region ?? "undefined";
      let capital = row.capital ?? "undefined";
      let subreg = row.subregion ?? "undefined";
      let area = row.area;
      let id = row.cca3;
      return [flag, name, population, region, capital, subreg, area, id];
    });
  }
  useEffect(() => {
    if (countryData != null) {
      countryData.forEach((row) => {
        if (row[3] === "Africa") {
          if (!sub[0][row[5]]) {
            sub[0][row[5]] = 1;
          }
        }
        if (row[3] === "Americas") {
          if (!sub[1][row[5]]) {
            sub[1][row[5]] = 1;
          }
        }
        if (row[3] === "Asia") {
          if (!sub[2][row[5]]) {
            sub[2][row[5]] = 1;
          }
        }
        if (row[3] === "Europe") {
          if (!sub[3][row[5]]) {
            sub[3][row[5]] = 1;
          }
        }
        if (row[3] === "Oceania") {
          if (!sub[4][row[5]]) {
            sub[4][row[5]] = 1;
          }
        }
      });
      setSubregion({
        ...subregion,
        Africa: Object.keys(sub[0]),
        Americas: Object.keys(sub[1]),
        Asia: Object.keys(sub[2]),
        Europe: Object.keys(sub[3]),
        Oceania: Object.keys(sub[4]),
      });
    }
  }, [Flag]);

  let op = [];
  if (countryData && subregion) {
    op = countryData
      .filter(
        (row) =>
          (!searchRegion ||
            row[3]
              .trim()
              .toLowerCase()
              .includes(searchRegion.trim().toLowerCase())) &&
          (!searchFilter ||
            row[1]
              .trim()
              .toLowerCase()
              .includes(searchFilter.trim().toLowerCase())) &&
          (!SubRegionflag ||
            row[5]
              .trim()
              .toLowerCase()
              .includes(SubRegionflag.trim().toLowerCase()))
      )
      .sort((a, b) => {
        if (Population === "none") return 0;
        else return Population === "ascending" ? a[2] - b[2] : b[2] - a[2];
      })
      .sort((a, b) => {
        if (Area === "none") return 0;
        else return Area === "ascending" ? a[6] - b[6] : b[6] - a[6];
      });
  }
  if (!countryData && !subregion) return <h1>loading</h1>;
  return countryData && subregion && op ? (
    <div
      className="body"
      style={{
        fontFamily: "Nunito Sans",
        paddingTop: "50px",
        backgroundColor: mode ? "hsl(0, 0%, 98%)" : " hsl(207, 26%, 17%)",
        color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
      }}
    >
      <button
        className="region"
        onClick={() => {
          setVisibility((prev) => !prev);
        }}
        style={{
          fontWeight: "600",
          borderRadius: "10px",
          border: "1px solid gray",
          backgroundColor: mode ? "hsl(0, 0%, 100%)" : " hsl(209, 23%, 22%)",
          color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        }}
      >
        filter by region
        <ul
          id="ull"
          style={{
            display: Visibility ? "block" : "none",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
          }}
          onClick={(data) => {
            setVisibility((prev) => !prev);
            setSubVisibility((prev) => !prev);
            setSubRegionflag(null);
            setsearchRegion(data.target.id);
          }}
        >
          <li id="Africa">Africa</li>
          <li id="Americas">Americas</li>
          <li id="Asia">Asia</li>
          <li id="Europe">Europe</li>
          <li id="Oceania">Oceania</li>
        </ul>
        <div
          className="SubRegion"
          style={{
            display: SubVisibility ? "block" : "none",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
          }}
          onClick={(data) => {
            setSubRegionflag(data.target.innerHTML);
          }}
          onMouseOut={(data) => {
            setSubVisibility((prev) => !prev);
          }}
        >
          {searchRegion
            ? subregion[searchRegion].map((row) => {
                return <li>{row}</li>;
              })
            : ""}
        </div>
      </button>
      <div
        class="filter"
        style={{
          borderRadius: "10px",
          textDecoration: "none",
          border: "1px solid gray",
          width: "80px",
          height: "27px",
          marginRight: "80px",
          paddingLeft: "30px",
          fontWeight: "600",
        }}
        onClick={(data) => {
          setPopulationFlag((prev) => !prev);
          setAreaFlag((prev) => !prev);
          if (data.target.id === "populationascending") {
            setPopulation("ascending");
            setArea("none");
          }
          if (data.target.id === "populationdecending") {
            setPopulation("decending");
            setArea("none");
          }
          if (data.target.id === "areaascending") {
            setArea("ascending");
            setPopulation("none");
          }
          if (data.target.id === "areadecending") {
            setArea("decending");
            setPopulation("none");
          }
        }}
      >
        filter
        <button
          className="population"
          style={{
            border: "none",
            textDecoration: "none",
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : " hsl(207, 26%, 17%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            marginTop: "15px",
            marginLeft: "-60px",
          }}
        >
          <button
            id="populationascending"
            style={{
              display: PopulationFlag ? "block" : "none",
              border: "none",
              textDecoration: "none",
              width: "170px",
              height: "30px",
              backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(207, 26%, 17%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              border: "1px solid gray",
              borderTop: "none",
              borderRadius: "10px",
            }}
          >
            ascending by population
          </button>
          <button
            id="populationdecending"
            style={{
              display: PopulationFlag ? "block" : "none",
              border: "none",
              textDecoration: "none",
              backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(207, 26%, 17%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              width: "170px",
              height: "30px",
              border: "1px solid gray",
              borderTop: "none",
              borderRadius: "10px",
            }}
          >
            {" "}
            descending by population
          </button>
        </button>
        <button
          className="area"
          style={{
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(207, 26%, 17%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            border: "none",
            textDecoration: "none",
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : "hsl(207, 26%, 17%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            marginLeft: "-60px",
          }}
        >
          <button
            id="areaascending"
            style={{
              display: AreaFlag ? "block" : "none",
              border: "none",
              textDecoration: "none",
              width: "170px",
              height: "30px",
              backgroundColor: mode
                ? "hsl(0, 0%, 100%)"
                : " hsl(207, 26%, 17%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              border: "1px solid gray",
              borderTop: "none",
              borderRadius: "10px",
            }}
          >
            {" "}
            ascending by area{" "}
          </button>
          <button
            id="areadecending"
            style={{
              display: AreaFlag ? "block" : "none",
              border: "none",
              width: "170px",
              height: "30px",
              textDecoration: "none",
              backgroundColor: mode
                ? "hsl(0, 0%, 100%)"
                : " hsl(207, 26%, 17%)",
              color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              border: "1px solid gray",
              borderTop: "none",
              borderRadius: "10px",
            }}
          >
            {" "}
            descending by area
          </button>
        </button>
      </div>
      <label htmlFor="filterInput" />
      <input
        id="filterInput"
        className="filter"
        type="text"
        value={searchFilter}
        onChange={(data) => {
          setSearchFilter(data.target.value);
        }}
        placeholder="search by country"
        style={{
          fontWeight: "bold",
          borderRadius: "10px",
          border: "1px solid gray",
          backgroundColor: mode ? "hsl(0, 0%, 100%)" : " hsl(207, 26%, 17%)",
          color: mode ? "black" : "hsl(0, 0%, 100%)",
        }}
      />
      <div
        className="content"
        style={{ paddingLeft: "80px", paddingRight: "50px" }}
      >
        {op.length === 0 ? (
          <h2>Country not found</h2>
        ) : (
          op.map((row) => (
            <Link to={`/country/${row[7]}`} style={{ textDecoration: "none" }}>
              {" "}
              <Element
                flag={row[0]}
                name={row[1]}
                population={row[2]}
                region={row[3]}
                capital={row[4]}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  ) : (
    <h1>
      <div
        className="body"
        style={{
          backgroundColor: mode ? "hsl(0, 0%, 98%)" : " hsl(207, 26%, 17%)",
          color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        }}
      >
        <button
          className="region"
          style={{
            fontWeight: "bold",
            border: "1px solid gray",
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : " hsl(209, 23%, 22%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
          }}
        >
          search for a region
        </button>
        <div
          class="filter"
          style={{
            textDecoration: "none",
            border: "1px solid gray",
            width: "50px",
            height: "20px",
            padding: "0.25em",
            marginRight: "100px",
          }}
        >
          filter
        </div>
        <label htmlFor="filterInput" />
        <input
          id="filterInput"
          className="filter"
          type="text"
          placeholder="search by country"
          style={{
            fontWeight: "bold",
            border: "1px solid gray",
            backgroundColor: mode ? "hsl(0, 0%, 100%)" : " hsl(209, 23%, 22%)",
            color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
            borderRadius: "10px",
          }}
        />
        <div
          className="content"
          style={{
            paddingTop: "10px",
            paddingLeft: "80px",
            paddingRight: "50px",
          }}
        ></div>
      </div>
    </h1>
  );
}
export default Body;
