/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
					950: "#172554",
				},
				background: {
					DEFAULT: "#141313",
					dark: "#0a0909",
					light: "#1a1a1a",
					grid: "#111827",
				},
				surface: {
					DEFAULT: "#1f2937",
					hover: "rgba(59, 130, 246, 0.1)",
					active: "rgba(59, 130, 246, 0.2)",
				},
				accent: {
					yellow: "hsla(48, 100%, 51%, 0.791)",
					purple: "hsla(304, 100%, 51%, 0.811)",
					pink: "#ff10f0",
				},
				"animation-dots": {
					primary: "hsla(211, 100%, 51%, 0.811)",
					secondary: "hsla(48, 100%, 51%, 0.791)",
				},
				secondary: {
					400: "#93c5fd",
					500: "#60a5fa",
					600: "#3b82f6",
				},
				text: {
					DEFAULT: "#fdf7f1",
					muted: "#9ca3af",
					light: "#e5e7eb",
				},
				border: {
					DEFAULT: "rgba(75, 85, 99, 0.3)",
					strong: "#4b5563",
				},
			},
			fontFamily: {
				mono: ['"JetBrains Mono"', "system-ui", "monospace"],
			},
			animation: {
				slide: "slide 4s linear infinite",
				"pulse-glow": "pulse-glow 0.8s ease-in-out infinite",
				"note-bounce": "note-bounce 0.15s ease-out",
			},
			boxShadow: {
				"glow-sm": "0 0 10px rgba(59, 130, 246, 0.2)",
				glow: "0 0 15px rgba(59, 130, 246, 0.3)",
				"glow-lg": "0 0 20px rgba(59, 130, 246, 0.4)",
				"glow-xl": "0 0 500px rgba(59, 130, 246, 0.7)",
				"glow-title":
					"0px 0px 120px rgba(59, 130, 246, 0.5), inset 0 0 10px rgba(59, 130, 246, 0.5)",
			},
			keyframes: {
				slide: {
					"100%": {
						"background-position": "50px 0, 125px 25px",
					},
				},
				"pulse-glow": {
					"0%, 100%": {
						"box-shadow":
							"0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2)",
						transform: "scale(1)",
					},
					"50%": {
						"box-shadow":
							"0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)",
						transform: "scale(1.05)",
					},
				},
				"note-bounce": {
					"0%": {
						transform: "scale(0.8)",
					},
					"50%": {
						transform: "scale(1.1)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
			},
		},
	},
	plugins: [],
};
