import React from "react";

function Counter({ count }) {
  return (
    <div className="total-notes">
      Total notes generated: {count || "Loading..."}
    </div>
  );
}

export default Counter;
