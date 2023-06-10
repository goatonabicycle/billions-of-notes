import React from "react";

function Counter({ count }) {
  return (
    <React.Fragment>
      Total notes generated: {count || "Loading..."}
    </React.Fragment>
  );
}

export default Counter;
