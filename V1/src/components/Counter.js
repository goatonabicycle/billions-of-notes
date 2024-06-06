import React, { memo } from "react";

const Counter = memo(function Counter({ count }) {
  return (
    <div className="total-notes">
      Total notes generated:{" "}
      {<span className="number">{count || "Loading..."}</span>}
    </div>
  );
});

export default Counter;
