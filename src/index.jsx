import { Analytics } from "@vercel/analytics/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./pages/App";
import Fret from "./pages/Fret";
import WhatScale from "./pages/WhatScale";
import useThemeStore from "./stores/themeStore";

function MinimalistWrapper({ children }) {
	const minimalistMode = useThemeStore((state) => state.minimalistMode);

	useEffect(() => {
		document.body.classList.toggle("brutalist", minimalistMode);
	}, [minimalistMode]);

	return children;
}

function AppRoutes() {
	return (
		<MinimalistWrapper>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/:id" element={<App />} />
				<Route path="/what-scale" element={<WhatScale />} />
				<Route path="/fret" element={<Fret />} />
				<Route path="/fret/:id" element={<Fret />} />
			</Routes>
		</MinimalistWrapper>
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
