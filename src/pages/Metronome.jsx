import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import NavBar from "../components/NavBar";

const TIME_SIGNATURES = [
	{ value: 4, label: "4/4" },
	{ value: 3, label: "3/4" },
	{ value: 6, label: "6/8" },
	{ value: 2, label: "2/4" },
	{ value: 5, label: "5/4" },
	{ value: 7, label: "7/8" },
];

const TEMPO_MARKINGS = [
	{ min: 20, max: 40, name: "Grave" },
	{ min: 40, max: 60, name: "Largo" },
	{ min: 60, max: 66, name: "Larghetto" },
	{ min: 66, max: 76, name: "Adagio" },
	{ min: 76, max: 108, name: "Andante" },
	{ min: 108, max: 120, name: "Moderato" },
	{ min: 120, max: 156, name: "Allegro" },
	{ min: 156, max: 176, name: "Vivace" },
	{ min: 176, max: 200, name: "Presto" },
	{ min: 200, max: 300, name: "Prestissimo" },
	{ min: 300, max: 1001, name: "Ludicrous" },
];

const getTempoMarking = (bpm) => {
	const marking = TEMPO_MARKINGS.find((m) => bpm >= m.min && bpm < m.max);
	return marking?.name || "Prestissimo";
};

export default function Metronome() {
	const [bpm, setBpm] = useState(120);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentBeat, setCurrentBeat] = useState(0);
	const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
	const [toneStarted, setToneStarted] = useState(false);
	const [volume, setVolume] = useState(80);
	const [accentFirst, setAccentFirst] = useState(true);
	const [subdivide, setSubdivide] = useState(1);

	const clickHiRef = useRef(null);
	const clickLoRef = useRef(null);
	const clickSubRef = useRef(null);
	const loopRef = useRef(null);
	const beatIndexRef = useRef(0);

	// Initialize audio
	useEffect(() => {
		// High click for accented beat
		clickHiRef.current = new Tone.MembraneSynth({
			pitchDecay: 0.008,
			octaves: 2,
			envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 },
		}).toDestination();

		// Low click for regular beats
		clickLoRef.current = new Tone.MembraneSynth({
			pitchDecay: 0.008,
			octaves: 1.5,
			envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.08 },
		}).toDestination();

		// Subdivision click (quieter)
		clickSubRef.current = new Tone.NoiseSynth({
			noise: { type: "white" },
			envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.02 },
		}).toDestination();

		return () => {
			clickHiRef.current?.dispose();
			clickLoRef.current?.dispose();
			clickSubRef.current?.dispose();
			loopRef.current?.dispose();
		};
	}, []);

	// Update volume
	useEffect(() => {
		const db = volume === 0 ? -Infinity : Tone.gainToDb(volume / 100);
		if (clickHiRef.current) clickHiRef.current.volume.value = db;
		if (clickLoRef.current) clickLoRef.current.volume.value = db - 3;
		if (clickSubRef.current) clickSubRef.current.volume.value = db - 12;
	}, [volume]);

	const startMetronome = useCallback(async () => {
		if (!toneStarted) {
			await Tone.start();
			setToneStarted(true);
		}

		beatIndexRef.current = 0;
		setCurrentBeat(0);

		Tone.Transport.bpm.value = bpm;

		// Calculate subdivision interval
		const subInterval = subdivide > 1 ? `${subdivide}n` : "4n";

		loopRef.current = new Tone.Loop((time) => {
			const beatInMeasure = beatIndexRef.current % beatsPerMeasure;
			const isSubBeat = subdivide > 1 && beatIndexRef.current % subdivide !== 0;

			if (isSubBeat) {
				// Subdivision click
				clickSubRef.current?.triggerAttackRelease("16n", time);
			} else {
				// Main beat
				const mainBeat = Math.floor(beatIndexRef.current / subdivide) % beatsPerMeasure;

				Tone.Draw.schedule(() => {
					setCurrentBeat(mainBeat);
				}, time);

				if (mainBeat === 0 && accentFirst) {
					clickHiRef.current?.triggerAttackRelease("C3", "16n", time);
				} else {
					clickLoRef.current?.triggerAttackRelease("G2", "16n", time);
				}
			}

			beatIndexRef.current++;
		}, subInterval);

		loopRef.current.start(0);
		Tone.Transport.start();
		setIsPlaying(true);
	}, [bpm, beatsPerMeasure, toneStarted, accentFirst, subdivide]);

	const stopMetronome = useCallback(() => {
		loopRef.current?.stop();
		loopRef.current?.dispose();
		loopRef.current = null;
		Tone.Transport.stop();
		Tone.Transport.cancel();
		setIsPlaying(false);
		setCurrentBeat(0);
		beatIndexRef.current = 0;
	}, []);

	const togglePlay = useCallback(() => {
		if (isPlaying) {
			stopMetronome();
		} else {
			startMetronome();
		}
	}, [isPlaying, startMetronome, stopMetronome]);

	// Update tempo while playing
	useEffect(() => {
		if (isPlaying) {
			Tone.Transport.bpm.value = bpm;
		}
	}, [bpm, isPlaying]);

	// Restart loop when settings change while playing
	useEffect(() => {
		if (isPlaying) {
			stopMetronome();
			startMetronome();
		}
	}, [beatsPerMeasure, subdivide, accentFirst]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.target.tagName === "INPUT") return;

			if (e.code === "Space") {
				e.preventDefault();
				togglePlay();
			} else if (e.code === "ArrowUp") {
				e.preventDefault();
				setBpm((prev) => Math.min(1000, prev + (e.shiftKey ? 10 : 1)));
			} else if (e.code === "ArrowDown") {
				e.preventDefault();
				setBpm((prev) => Math.max(20, prev - (e.shiftKey ? 10 : 1)));
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [togglePlay]);

	const tempoMarking = getTempoMarking(bpm);

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex-grow flex items-center justify-center p-4">
				<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 rounded-lg p-6 md:p-8 lg:p-10 max-w-lg lg:max-w-2xl xl:max-w-3xl w-full">
					{/* Header */}
					<div className="text-center mb-6 lg:mb-8">
						<h1 className="text-2xl lg:text-3xl font-bold text-primary-100 mb-1">Metronome</h1>
						<p className="text-xs lg:text-sm text-primary-400/60">Space to play/pause, arrows to adjust tempo</p>
					</div>

					{/* Beat Visualization */}
					<div className="flex justify-center gap-2 lg:gap-4 mb-8 lg:mb-12">
						{Array.from({ length: beatsPerMeasure }).map((_, i) => (
							<div
								key={i}
								className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full border-2 lg:border-3 transition-all duration-75 flex items-center justify-center text-sm md:text-base lg:text-xl xl:text-2xl font-medium ${
									currentBeat === i && isPlaying
										? i === 0
											? "bg-secondary-500 border-secondary-400 text-white scale-110"
											: "bg-primary-500 border-primary-400 text-white scale-110"
										: i === 0
											? "border-secondary-500/50 text-secondary-400/50"
											: "border-primary-500/30 text-primary-400/30"
								}`}
							>
								{i + 1}
							</div>
						))}
					</div>

					{/* Large BPM Display */}
					<div className="text-center mb-6 lg:mb-10">
						<div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary-100 mb-1 lg:mb-2 tabular-nums">
							{bpm}
						</div>
						<div className="text-sm lg:text-base xl:text-lg text-primary-400/80">{tempoMarking}</div>
					</div>

					{/* BPM Slider */}
					<div className="mb-6 lg:mb-8">
						<input
							type="range"
							min="20"
							max="1000"
							value={bpm}
							onChange={(e) => setBpm(Number(e.target.value))}
							className="w-full h-3 lg:h-4 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
						/>
						<div className="flex justify-between text-xs lg:text-sm text-primary-500/50 mt-1 lg:mt-2">
							<span>20</span>
							<span>1000</span>
						</div>
					</div>

					{/* Tap Tempo & Play Button */}
					<div className="flex gap-3 lg:gap-4 mb-6 lg:mb-8">
						<TapTempo onTempo={setBpm} />
						<button
							type="button"
							onClick={togglePlay}
							className={`flex-1 py-4 lg:py-5 xl:py-6 rounded-lg font-medium text-lg lg:text-xl transition-all ${
								isPlaying
									? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50"
									: "bg-primary-500/20 hover:bg-primary-500/30 text-primary-200 border border-primary-500/50"
							}`}
						>
							{isPlaying ? "Stop" : "Start"}
						</button>
					</div>

					{/* Settings Grid */}
					<div className="grid grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
						{/* Time Signature */}
						<div>
							<label className="block text-xs lg:text-sm text-primary-400/60 mb-1.5 lg:mb-2">Time Signature</label>
							<select
								value={beatsPerMeasure}
								onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
								className="w-full bg-gray-800/50 border border-primary-500/20 rounded px-3 py-2 lg:py-3 text-sm lg:text-base text-primary-100 focus:border-primary-500/50 focus:outline-none"
							>
								{TIME_SIGNATURES.map((ts) => (
									<option key={ts.value} value={ts.value}>
										{ts.label}
									</option>
								))}
							</select>
						</div>

						{/* Subdivisions */}
						<div>
							<label className="block text-xs lg:text-sm text-primary-400/60 mb-1.5 lg:mb-2">Subdivisions</label>
							<select
								value={subdivide}
								onChange={(e) => setSubdivide(Number(e.target.value))}
								className="w-full bg-gray-800/50 border border-primary-500/20 rounded px-3 py-2 lg:py-3 text-sm lg:text-base text-primary-100 focus:border-primary-500/50 focus:outline-none"
							>
								<option value={1}>None</option>
								<option value={2}>Eighth notes</option>
								<option value={3}>Triplets</option>
								<option value={4}>Sixteenth notes</option>
							</select>
						</div>

						{/* Volume */}
						<div>
							<label className="block text-xs lg:text-sm text-primary-400/60 mb-1.5 lg:mb-2">Volume</label>
							<input
								type="range"
								min="0"
								max="100"
								value={volume}
								onChange={(e) => setVolume(Number(e.target.value))}
								className="w-full h-2 lg:h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
							/>
						</div>

						{/* Accent Toggle */}
						<div className="flex items-end">
							<label className="flex items-center gap-2 lg:gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={accentFirst}
									onChange={(e) => setAccentFirst(e.target.checked)}
									className="w-4 h-4 lg:w-5 lg:h-5 rounded border-primary-500/30 bg-gray-800 text-primary-500 focus:ring-primary-500/50"
								/>
								<span className="text-sm lg:text-base text-primary-300">Accent first beat</span>
							</label>
						</div>
					</div>

					{/* Quick Tempo Buttons */}
					<div className="flex flex-wrap gap-2 lg:gap-3 justify-center">
						{[60, 80, 100, 120, 140, 180, 220, 300].map((tempo) => (
							<button
								key={tempo}
								type="button"
								onClick={() => setBpm(tempo)}
								className={`px-3 lg:px-5 py-1.5 lg:py-2.5 text-xs lg:text-sm rounded transition-all ${
									bpm === tempo
										? "bg-primary-500/30 text-primary-200 border border-primary-500/50"
										: "bg-gray-800/50 text-primary-400/60 border border-primary-500/10 hover:border-primary-500/30"
								}`}
							>
								{tempo}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// Tap Tempo Component
function TapTempo({ onTempo }) {
	const tapsRef = useRef([]);
	const timeoutRef = useRef(null);

	const handleTap = useCallback(() => {
		const now = Date.now();
		tapsRef.current.push(now);

		// Reset if gap is too long
		if (tapsRef.current.length > 1) {
			const lastGap = now - tapsRef.current[tapsRef.current.length - 2];
			if (lastGap > 2000) {
				tapsRef.current = [now];
			}
		}

		// Keep only last 8 taps
		if (tapsRef.current.length > 8) {
			tapsRef.current.shift();
		}

		// Calculate average BPM from at least 2 taps
		if (tapsRef.current.length >= 2) {
			const intervals = [];
			for (let i = 1; i < tapsRef.current.length; i++) {
				intervals.push(tapsRef.current[i] - tapsRef.current[i - 1]);
			}
			const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
			const calculatedBpm = Math.round(60000 / avgInterval);

			if (calculatedBpm >= 20 && calculatedBpm <= 1000) {
				onTempo(calculatedBpm);
			}
		}

		// Clear taps after 2 seconds of inactivity
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			tapsRef.current = [];
		}, 2000);
	}, [onTempo]);

	return (
		<button
			type="button"
			onClick={handleTap}
			className="px-6 lg:px-8 xl:px-10 py-4 lg:py-5 xl:py-6 bg-secondary-500/20 hover:bg-secondary-500/30 text-secondary-300 border border-secondary-500/50 rounded-lg font-medium text-base lg:text-lg transition-all active:scale-95"
		>
			Tap
		</button>
	);
}
