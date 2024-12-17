import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./pages/App";
import WhatScale from "./pages/WhatScale";
import Fret from "./pages/Fret";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/:id" element={<App />} />
			<Route path="/what-scale" element={<WhatScale />} />
			<Route path="/fret" element={<Fret />} />
			<Route path="/fret/:id" element={<Fret />} />
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
