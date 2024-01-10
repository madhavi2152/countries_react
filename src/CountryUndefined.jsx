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
