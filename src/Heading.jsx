import { useContext } from "react";
import { mycontext } from "./App";

function Heading({ darkmode }) {
  let mode = useContext(mycontext);
  return (
    <header
      style={{
        fontFamily: "Nunito Sans",
        fontWeight: "800",
        backgroundColor: mode ? "hsl(0, 0%, 98%)" : " hsl(207, 26%, 17%)",
        color: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        height: "80px",
        paddingLeft: "100px",
        paddingRight: "100px",
        borderBottom: "1px solid",
        borderBottomColor: mode ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
      }}
    >
      <h1>Where in the world</h1>
      <p className="darkmode" onClick={() => darkmode()}>
        {mode ? "Darkmode" : "lightmode"}
      </p>
    </header>
  );
}

export default Heading;
