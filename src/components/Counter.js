import React from "react";

function Counter({ count }) {
  return (
    <div className="total-notes">
      Total notes generated:{" "}
      {<span className="number">{count}</span> || "Loading..."}
    </div>
  );
}

export default Counter;
