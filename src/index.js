import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import ShowMe from "./ShowMe";
import WhatScale from "./WhatScale";
import Ampwall from "./CoolAmpwallStuff";
import Fret from "./Fret";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/show-me" element={<ShowMe />} />
			<Route path="/what-scale" element={<WhatScale />} />
			<Route path="/ampwall" element={<Ampwall />} />
			<Route path="/fret" element={<Fret />} />
		</Routes>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
		<Analytics />
	</React.StrictMode>,
);
