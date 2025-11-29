import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_TEMPO } from "../useful";

const navItems = [
	{ path: "/riff", label: "Riff" },
	{ path: "/fret", label: "Fretboard" },
	{ path: "/what-scale", label: "Scale Finder" },
	{ path: "/metronome", label: "Metronome" },
	{ path: "/intervals", label: "Ear Training" },
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="w-full bg-gray-900/90 backdrop-blur-sm border-b border-primary-500/20">
			<div className="flex items-center justify-between px-4 py-2">
				<Link
					to="/"
					className="text-sm text-primary-100 hover:text-primary-50 transition-colors"
				>
					<AnimatedTitle tempo={effectiveTempo} />
				</Link>

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-1">
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

				{/* Mobile hamburger button */}
				<button
					type="button"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className="md:hidden p-2 text-primary-400 hover:text-primary-300 transition-colors"
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? (
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					) : (
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					)}
				</button>
			</div>

			{/* Mobile menu dropdown */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t border-primary-500/20 bg-gray-900/95">
					<div className="flex flex-col py-2">
						{navItems.map((item) => {
							const isActive = location.pathname.startsWith(item.path);
							return (
								<Link
									key={item.path}
									to={item.path}
									onClick={() => setMobileMenuOpen(false)}
									className={`px-4 py-2 text-sm font-medium transition-colors ${
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
			)}
		</nav>
	);
}
