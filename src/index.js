import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import "./index.css";
import App from "./App";
import ShowMe from "./ShowMe";
import WhatScale from "./WhatScale";
import V2App from "./v2/App";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<App />}
      />
      <Route
        path="/show-me"
        element={<ShowMe />}
      />
      <Route
        path="/what-scale"
        element={<WhatScale />}
      />
      <Route
        path="/v2"
        element={<V2App />}
      />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
);
