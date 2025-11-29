import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_TEMPO } from "../useful";

const navItems = [
	{ path: "/riff", label: "Riff" },
	{ path: "/fret", label: "Fretboard" },
	{ path: "/what-scale", label: "Scale Finder" },
	{ path: "/songs", label: "Songs" },
];

const AnimatedTitle = ({ tempo }) => {
	const colorCycleDuration = Math.max(0.2, 240 / tempo);

	const keyframes = `
		@keyframes navTextGlow {
			0% { color: #FF2D95; }
			33% { color: #FF8C2D; }
			66% { color: #2DE2FF; }
			100% { color: #FF2D95; }
		}
	`;

	const text = "BILLIONS OF NOTES";

	return (
		<span className="inline-flex">
			<style>{keyframes}</style>
			{text.split("").map((char, index) => (
				<span
					key={index}
					style={{
						animationName: "navTextGlow",
						animationDuration: `${colorCycleDuration}s`,
						animationTimingFunction: "linear",
						animationIterationCount: "infinite",
						animationDelay: `${index * (colorCycleDuration / text.length)}s`,
					}}
					className="font-bold"
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</span>
	);
};

export default function NavBar({ tempo }) {
	const location = useLocation();
	const effectiveTempo = tempo || DEFAULT_TEMPO;

	return (
		<nav className="w-full bg-gray-900/90 backdrop-blur-sm border-b border-primary-500/20">
			<div className="flex items-center justify-between px-4 py-2">
				<Link
					to="/"
					className="text-sm text-primary-100 hover:text-primary-50 transition-colors"
				>
					<AnimatedTitle tempo={effectiveTempo} />
				</Link>

				<div className="flex items-center gap-1">
					{navItems.map((item) => {
						const isActive = location.pathname.startsWith(item.path);
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
									isActive
										? "bg-primary-500/20 text-primary-300"
										: "text-primary-400/70 hover:text-primary-300 hover:bg-primary-500/10"
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
