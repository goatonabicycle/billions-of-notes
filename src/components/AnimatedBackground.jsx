import { useEffect, useState } from "react";

const animations = [
	// 1. Original sliding dots
	{
		name: "sliding-dots",
		style: {
			backgroundImage: `radial-gradient(hsla(211, 100%, 51%, 0.811) 1px, transparent 0),
				radial-gradient(hsla(48, 100%, 51%, 0.791) 1px, transparent 0)`,
			backgroundSize: "50px 50px",
			backgroundPosition: "0 0, 25px 25px",
			animation: "slide 4s linear infinite",
		},
		keyframes: `@keyframes slide {
			100% { background-position: 50px 0, 125px 25px; }
		}`,
	},
	// 2. Floating particles upward
	{
		name: "floating-up",
		style: {
			backgroundImage: `radial-gradient(circle, hsla(280, 100%, 60%, 0.6) 1px, transparent 1px),
				radial-gradient(circle, hsla(200, 100%, 60%, 0.4) 1px, transparent 1px)`,
			backgroundSize: "60px 60px, 90px 90px",
			backgroundPosition: "0 0, 30px 30px",
			animation: "floatUp 8s linear infinite",
		},
		keyframes: `@keyframes floatUp {
			0% { background-position: 0 0, 30px 30px; }
			100% { background-position: 0 -60px, 30px -30px; }
		}`,
	},
	// 3. Diagonal sweep
	{
		name: "diagonal-sweep",
		style: {
			backgroundImage: `linear-gradient(45deg, hsla(211, 100%, 51%, 0.1) 25%, transparent 25%),
				linear-gradient(-45deg, hsla(48, 100%, 51%, 0.1) 25%, transparent 25%)`,
			backgroundSize: "60px 60px",
			animation: "diagonalSweep 6s linear infinite",
		},
		keyframes: `@keyframes diagonalSweep {
			0% { background-position: 0 0; }
			100% { background-position: 60px 60px; }
		}`,
	},
	// 4. Scrolling grid - smooth continuous motion
	{
		name: "scrolling-grid",
		style: {
			backgroundImage: `linear-gradient(hsla(211, 100%, 51%, 0.3) 1px, transparent 1px),
				linear-gradient(90deg, hsla(211, 100%, 51%, 0.3) 1px, transparent 1px)`,
			backgroundSize: "50px 50px",
			animation: "scrollGrid 120s linear infinite",
		},
		keyframes: `@keyframes scrollGrid {
			0% { background-position: 0 0; }
			100% { background-position: 500px 500px; }
		}`,
	},
	// 5. Starfield
	{
		name: "starfield",
		style: {
			backgroundImage: `radial-gradient(circle, white 1px, transparent 1px),
				radial-gradient(circle, hsla(211, 100%, 70%, 0.8) 1px, transparent 1px),
				radial-gradient(circle, hsla(48, 100%, 70%, 0.6) 1px, transparent 1px)`,
			backgroundSize: "100px 100px, 150px 150px, 200px 200px",
			backgroundPosition: "0 0, 50px 50px, 100px 25px",
			animation: "starfield 60s linear infinite",
		},
		keyframes: `@keyframes starfield {
			0% { background-position: 0 0, 50px 50px, 100px 25px; }
			100% { background-position: 100px 100px, 150px 150px, 200px 125px; }
		}`,
	},
	// 7. Hexagon pattern drift
	{
		name: "hex-drift",
		style: {
			backgroundImage: `radial-gradient(circle at 50% 50%, hsla(280, 100%, 51%, 0.5) 2px, transparent 2px),
				radial-gradient(circle at 0% 50%, hsla(211, 100%, 51%, 0.3) 2px, transparent 2px)`,
			backgroundSize: "30px 52px",
			animation: "hexDrift 5s linear infinite",
		},
		keyframes: `@keyframes hexDrift {
			0% { background-position: 0 0, 15px 26px; }
			100% { background-position: 30px 52px, 45px 78px; }
		}`,
	},
	// 8. Crossing lines - smooth continuous motion
	{
		name: "crossing-lines",
		style: {
			backgroundImage: `linear-gradient(0deg, hsla(211, 100%, 51%, 0.25) 1px, transparent 1px),
				linear-gradient(90deg, hsla(48, 100%, 51%, 0.25) 1px, transparent 1px),
				linear-gradient(45deg, hsla(280, 100%, 51%, 0.15) 1px, transparent 1px)`,
			backgroundSize: "40px 40px, 60px 60px, 80px 80px",
			animation: "crossingLines 90s linear infinite",
		},
		keyframes: `@keyframes crossingLines {
			0% { background-position: 0 0, 0 0, 0 0; }
			100% { background-position: 400px 400px, -600px 600px, 800px 800px; }
		}`,
	},
	// 9. Ripple effect
	{
		name: "ripple",
		style: {
			backgroundImage: `radial-gradient(circle, hsla(211, 100%, 51%, 0.3) 3%, transparent 3%),
				radial-gradient(circle, hsla(211, 100%, 51%, 0.2) 3%, transparent 3%)`,
			backgroundSize: "60px 60px, 90px 90px",
			backgroundPosition: "0 0, 30px 30px",
			animation: "ripple 15s linear infinite",
		},
		keyframes: `@keyframes ripple {
			0% { background-position: 0 0, 30px 30px; }
			100% { background-position: 60px 60px, 120px 120px; }
		}`,
	},
	// 10. Matrix rain (vertical)
	{
		name: "matrix-rain",
		style: {
			backgroundImage: `linear-gradient(180deg, hsla(140, 100%, 50%, 0.15) 1px, transparent 1px),
				linear-gradient(180deg, hsla(140, 100%, 50%, 0.1) 1px, transparent 1px)`,
			backgroundSize: "25px 40px, 45px 60px",
			animation: "matrixRain 4s linear infinite",
		},
		keyframes: `@keyframes matrixRain {
			0% { background-position: 0 0, 15px 0; }
			100% { background-position: 0 40px, 15px 60px; }
		}`,
	},
	// 11. Aurora waves - flowing color bands
	{
		name: "aurora-waves",
		style: {
			backgroundImage: `
				linear-gradient(135deg, hsla(280, 80%, 50%, 0.15) 0%, transparent 50%),
				linear-gradient(225deg, hsla(180, 80%, 50%, 0.15) 0%, transparent 50%),
				linear-gradient(45deg, hsla(320, 80%, 50%, 0.1) 0%, transparent 50%)`,
			backgroundSize: "400px 400px, 300px 300px, 500px 500px",
			animation: "auroraWaves 30s linear infinite",
		},
		keyframes: `@keyframes auroraWaves {
			0% { background-position: 0 0, 100% 0, 50% 50%; }
			100% { background-position: 400px 200px, -300px 150px, 550px -250px; }
		}`,
	},
	// 12. Constellation drift - scattered dots with connecting feel
	{
		name: "constellation",
		style: {
			backgroundImage: `
				radial-gradient(circle, hsla(220, 100%, 80%, 0.8) 1px, transparent 1px),
				radial-gradient(circle, hsla(220, 100%, 70%, 0.5) 1px, transparent 1px),
				radial-gradient(circle, hsla(200, 100%, 90%, 0.3) 1px, transparent 1px),
				linear-gradient(60deg, hsla(220, 80%, 60%, 0.05) 1px, transparent 1px)`,
			backgroundSize: "120px 120px, 80px 80px, 200px 200px, 60px 60px",
			backgroundPosition: "0 0, 40px 40px, 100px 50px, 0 0",
			animation: "constellationDrift 80s linear infinite",
		},
		keyframes: `@keyframes constellationDrift {
			0% { background-position: 0 0, 40px 40px, 100px 50px, 0 0; }
			100% { background-position: 120px 60px, 160px 100px, 300px 150px, 60px 30px; }
		}`,
	},
];

export default function AnimatedBackground({ showLabel = false }) {
	const [animation] = useState(() => animations[Math.floor(Math.random() * animations.length)]);

	useEffect(() => {
		// Inject keyframes
		const styleId = "animated-bg-keyframes";
		let styleEl = document.getElementById(styleId);
		if (!styleEl) {
			styleEl = document.createElement("style");
			styleEl.id = styleId;
			document.head.appendChild(styleEl);
		}
		styleEl.textContent = animation.keyframes;

		// Apply styles to body
		Object.assign(document.body.style, animation.style);

		return () => {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundSize = "";
			document.body.style.backgroundPosition = "";
			document.body.style.animation = "";
		};
	}, [animation]);

	if (showLabel) {
		return (
			<div className="fixed bottom-2 right-2 px-2 py-1 bg-black/70 text-primary-400 text-xs rounded z-50">
				BG: {animation.name}
			</div>
		);
	}

	return null;
}
