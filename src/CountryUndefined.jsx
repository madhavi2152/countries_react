import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "./App";
function CountryUndefined() {
  let mode = useContext(mycontext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <header style={{ display: "none" }}></header>
      <button
        style={{
          border: "2px solid black",
          margin: "100px",
          marginLeft: "400px",
          width: "100px",
          height: "50px",
          padding: 0,
          textDecoration: "none",
          background: "none",
          cursor: "pointer",
          backgroundColor: "white",
        }}
        onClick={handleGoBack}
      >
        {"<--     "}
        back{" "}
      </button>
      <h1 style={{ paddingLeft: "500px" }}>country undefined</h1>)
    </>
  );
}

export default CountryUndefined;
