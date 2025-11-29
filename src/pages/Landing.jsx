import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { DEFAULT_TEMPO } from "../useful";

const AnimatedTitle = ({ tempo }) => {
	const colorCycleDuration = Math.max(0.2, 240 / tempo);

	const keyframes = `
		@keyframes homeTextGlow {
			0% { color: #FF2D95; }
			33% { color: #FF8C2D; }
			66% { color: #2DE2FF; }
			100% { color: #FF2D95; }
		}
	`;

	const text = "BILLIONS OF NOTES";

	return (
		<span className="inline-flex flex-wrap justify-center">
			<style>{keyframes}</style>
			{text.split("").map((char, index) => (
				<span
					key={index}
					style={{
						animationName: "homeTextGlow",
						animationDuration: `${colorCycleDuration}s`,
						animationTimingFunction: "linear",
						animationIterationCount: "infinite",
						animationDelay: `${index * (colorCycleDuration / text.length)}s`,
					}}
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</span>
	);
};

const tools = [
	{
		id: "riff",
		name: "Riff Generator",
		description: "Generate random melodies and riffs in any key and scale",
		href: "/riff",
	},
	{
		id: "fret",
		name: "Fretboard",
		description: "Visualize scales and notes on guitar fretboard",
		href: "/fret",
	},
	{
		id: "scale",
		name: "Scale Finder",
		description: "Identify what scale you're playing from selected notes",
		href: "/what-scale",
	},
	{
		id: "metronome",
		name: "Metronome",
		description: "Practice with precision timing, tap tempo, and subdivisions",
		href: "/metronome",
	},
	{
		id: "intervals",
		name: "Ear Training",
		description: "Train your ear to recognize pitch differences between notes",
		href: "/intervals",
	},
	{
		id: "songs",
		name: "Song Builder",
		description: "Construct and share song ideas with sections, chords, and riffs",
		href: "/songs",
		wip: true,
	},
];

function ToolCard({ tool }) {
	return (
		<a
			href={tool.href}
			className="group block p-6 bg-gray-900/60 backdrop-blur-sm border border-primary-500/20 rounded-lg
				transition-all duration-300 hover:border-primary-400/60 hover:bg-primary-900/20 hover:shadow-glow relative"
		>
			{tool.wip && (
				<span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 rounded">
					WIP
				</span>
			)}
			<h2 className="text-xl font-bold text-primary-100 mb-2 group-hover:text-primary-50 transition-colors">
				{tool.name}
			</h2>
			<p className="text-sm text-primary-400/80">
				{tool.description}
			</p>
		</a>
	);
}

export default function Landing() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8">
			<AnimatedBackground showSelector={true} />
			<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 rounded-lg p-8 md:p-12 max-w-4xl w-full">
				{/* Header */}
				<div className="text-center mb-10">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-100 mb-4 tracking-tight">
						<AnimatedTitle tempo={DEFAULT_TEMPO} />
					</h1>
					<p className="text-primary-400/80 max-w-xl mx-auto">
						A tool for musicians. Get more comfortable with the fretboard. Break out of creative ruts, visualize scales, and sketch song ideas.
					</p>
				</div>

				{/* Tool Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
					{tools.map((tool) => (
						<ToolCard key={tool.id} tool={tool} />
					))}
				</div>

				{/* Coming Soon */}
				<div className="mb-8">
					<h3 className="text-xs text-primary-500 uppercase tracking-wider mb-3 text-center">Coming Soon</h3>
					<div className="flex justify-center">
						<div className="p-3 bg-gray-900/40 border border-dashed border-primary-500/20 rounded-lg opacity-60 max-w-[200px]">
							<h4 className="text-sm font-medium text-primary-300 mb-1">Circle of Fifths</h4>
							<p className="text-xs text-primary-500">Key relationships visualized</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center border-t border-primary-500/20 pt-6">
					<div className="flex items-center justify-center gap-6 mb-4">
						<a
							href="https://github.com/goatonabicycle/billions-of-notes"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
						>
							Source Code
						</a>
						<a
							href="https://github.com/goatonabicycle/billions-of-notes/issues/new"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
						>
							Share Ideas
						</a>
					</div>

					<a
						href="https://ko-fi.com/B0B1LV8D9"
						target="_blank"
						rel="noreferrer"
						className="inline-block"
					>
						<img
							height="28"
							style={{ border: "0px", height: "28px" }}
							src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
							border="0"
							alt="Buy Me a Coffee at ko-fi.com"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
