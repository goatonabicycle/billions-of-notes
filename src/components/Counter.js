import React from "react";

function Counter({ count }) {
  return (
    <div className="total-notes">
      Total notes generated:{" "}
      {<span className="number">{count || "Loading..."}</span>}
    </div>
  );
}

export default Counter;
