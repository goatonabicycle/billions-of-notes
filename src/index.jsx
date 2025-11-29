import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Landing from "./pages/Landing";
import App from "./pages/App";
import Fret from "./pages/Fret";
import Metronome from "./pages/Metronome";
import Songs from "./pages/Songs";
import WhatScale from "./pages/WhatScale";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/riff" element={<App />} />
			<Route path="/riff/:id" element={<App />} />
			<Route path="/what-scale" element={<WhatScale />} />
			<Route path="/fret" element={<Fret />} />
			<Route path="/fret/:id" element={<Fret />} />
			<Route path="/metronome" element={<Metronome />} />
			<Route path="/songs" element={<Songs />} />
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
