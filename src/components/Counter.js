import React from "react";

function Counter({ count }) {
  return <p>Total notes: {count || "Loading..."}</p>;
}

export default Counter;
