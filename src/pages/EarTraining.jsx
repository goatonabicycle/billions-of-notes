import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import NavBar from "../components/NavBar";

const ALL_NOTES = [
	"C2", "D2", "E2", "F2", "G2", "A2", "B2",
	"C3", "D3", "E3", "F3", "G3", "A3", "B3",
	"C4", "D4", "E4", "F4", "G4", "A4", "B4",
	"C5", "D5", "E5", "F5", "G5",
];

const MAX_HISTORY = 20;

export default function EarTraining() {
	const [toneStarted, setToneStarted] = useState(false);
	const [firstNote, setFirstNote] = useState(null);
	const [secondNote, setSecondNote] = useState(null);
	const [answer, setAnswer] = useState(null); // "higher" or "lower"
	const [guess, setGuess] = useState(null);
	const [isCorrect, setIsCorrect] = useState(null);
	const [streak, setStreak] = useState(0);
	const [bestStreak, setBestStreak] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [history, setHistory] = useState([]); // Array of true/false for correct/incorrect
	const [autoContinue, setAutoContinue] = useState(false);

	const synthRef = useRef(null);
	const autoContinueRef = useRef(autoContinue);
	const isPlayingRef = useRef(false);

	useEffect(() => {
		synthRef.current = new Tone.Synth({
			envelope: {
				attack: 0.02,
				decay: 0.1,
				sustain: 0.3,
				release: 0.8,
			},
		}).toDestination();
		synthRef.current.volume.value = -6;

		return () => {
			synthRef.current?.dispose();
		};
	}, []);

	// Keep ref in sync with state for use in callbacks
	useEffect(() => {
		autoContinueRef.current = autoContinue;
	}, [autoContinue]);

	const startTone = async () => {
		await Tone.start();
		setToneStarted(true);
		// Auto-start first round
		setTimeout(() => {
			const { note1, note2 } = generateNewRound();
			setTimeout(() => playNotes(note1, note2), 100);
		}, 100);
	};

	const generateNewRound = useCallback(() => {
		// Use crypto for better randomness
		const getRandomIndex = () => {
			const array = new Uint32Array(1);
			crypto.getRandomValues(array);
			return array[0] % ALL_NOTES.length;
		};

		// Pick two different random notes
		const idx1 = getRandomIndex();
		let idx2 = getRandomIndex();

		// Make sure they're different
		while (idx2 === idx1) {
			idx2 = getRandomIndex();
		}

		const note1 = ALL_NOTES[idx1];
		const note2 = ALL_NOTES[idx2];

		setFirstNote(note1);
		setSecondNote(note2);
		setAnswer(idx2 > idx1 ? "higher" : "lower");
		setGuess(null);
		setIsCorrect(null);

		return { note1, note2 };
	}, []);

	const playNotes = useCallback(async (note1, note2) => {
		if (!synthRef.current || isPlayingRef.current) return;

		isPlayingRef.current = true;
		setIsPlaying(true);

		const now = Tone.now();
		synthRef.current.triggerAttackRelease(note1, "4n", now);
		synthRef.current.triggerAttackRelease(note2, "4n", now + 0.7);

		setTimeout(() => {
			isPlayingRef.current = false;
			setIsPlaying(false);
		}, 1400);
	}, []);

	const handleNewRound = useCallback(async () => {
		const { note1, note2 } = generateNewRound();
		setTimeout(() => playNotes(note1, note2), 100);
	}, [generateNewRound, playNotes]);

	const handleReplay = useCallback(() => {
		if (firstNote && secondNote) {
			playNotes(firstNote, secondNote);
		}
	}, [firstNote, secondNote, playNotes]);

	const handleGuess = useCallback((userGuess) => {
		if (isCorrect !== null) return;

		setGuess(userGuess);

		const correct = userGuess === answer;
		setIsCorrect(correct);
		setHistory((prev) => [...prev.slice(-(MAX_HISTORY - 1)), correct]);

		if (correct) {
			setStreak((prev) => {
				const newStreak = prev + 1;
				setBestStreak((best) => Math.max(best, newStreak));
				return newStreak;
			});
		} else {
			setStreak(0);
		}

		// Auto-continue after a brief delay to show result
		if (autoContinueRef.current) {
			setTimeout(() => {
				handleNewRound();
			}, correct ? 400 : 800);
		}
	}, [answer, isCorrect, handleNewRound]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!toneStarted) return;

			if (e.code === "Space") {
				e.preventDefault();
				if (isCorrect !== null) {
					handleNewRound();
				} else if (firstNote) {
					handleReplay();
				} else {
					handleNewRound();
				}
			} else if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && isCorrect === null && firstNote) {
				e.preventDefault();
				handleGuess("higher");
			} else if ((e.code === "ArrowDown" || e.code === "ArrowRight") && isCorrect === null && firstNote) {
				e.preventDefault();
				handleGuess("lower");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toneStarted, firstNote, isCorrect, handleNewRound, handleReplay, handleGuess]);

	if (!toneStarted) {
		return (
			<div className="flex flex-col min-h-screen">
				<NavBar />
				<div className="flex-grow flex items-center justify-center p-4">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-primary-100 mb-4">Ear Training</h1>
						<p className="text-primary-400/60 mb-6">Listen to two notes. Is the second one higher or lower?</p>
						<button
							type="button"
							onClick={startTone}
							className="px-8 py-4 bg-primary-500/20 hover:bg-primary-500/30 text-primary-200 border border-primary-500/50 rounded-lg font-medium text-lg transition-all"
						>
							Start
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex-grow flex items-center justify-center p-4">
				<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 rounded-lg p-6 md:p-8 lg:p-12 max-w-lg lg:max-w-xl w-full">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-2xl lg:text-3xl font-bold text-primary-100 mb-2">Ear Training</h1>
						<p className="text-sm text-primary-400/60">Is the second note higher or lower?</p>
					</div>

					{/* Streak display */}
					<div className="flex justify-center gap-8 mb-6">
						<div className="text-center">
							<div className="text-4xl lg:text-5xl font-bold text-primary-200">{streak}</div>
							<div className="text-xs text-primary-400/60">Streak</div>
						</div>
						<div className="text-center">
							<div className="text-4xl lg:text-5xl font-bold text-primary-400">{bestStreak}</div>
							<div className="text-xs text-primary-400/60">Best</div>
						</div>
					</div>

					{/* History visualization */}
					{history.length > 0 && (
						<div className="flex justify-center gap-1 mb-8 flex-wrap">
							{history.map((correct, index) => (
								<div
									key={index}
									className={`w-4 h-4 rounded-sm transition-all ${
										correct
											? "bg-green-500"
											: "bg-red-500"
									}`}
									title={correct ? "Correct" : "Wrong"}
								/>
							))}
						</div>
					)}

					{/* Main interaction area */}
					<div className="bg-gray-800/50 rounded-lg p-6 lg:p-8 mb-6">
						{isCorrect === null ? (
							<div className="text-center">
								{/* Replay button */}
								<button
									type="button"
									onClick={handleReplay}
									disabled={isPlaying}
									className="px-6 py-3 mb-8 bg-secondary-500/20 hover:bg-secondary-500/30 text-secondary-300 border border-secondary-500/50 rounded-lg font-medium transition-all disabled:opacity-50"
								>
									{isPlaying ? "Playing..." : "Replay"}
								</button>

								{/* Answer buttons */}
								<div className="flex gap-4 justify-center">
									<button
										type="button"
										onClick={() => handleGuess("higher")}
										className="flex-1 max-w-[140px] py-6 lg:py-8 bg-green-900/30 hover:bg-green-900/50 border border-green-500/30 hover:border-green-500/50 rounded-lg transition-all flex flex-col items-center gap-2"
									>
										<span className="text-4xl">↑</span>
										<span className="text-green-300 font-medium">Higher</span>
									</button>
									<button
										type="button"
										onClick={() => handleGuess("lower")}
										className="flex-1 max-w-[140px] py-6 lg:py-8 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all flex flex-col items-center gap-2"
									>
										<span className="text-4xl">↓</span>
										<span className="text-red-300 font-medium">Lower</span>
									</button>
								</div>

								<p className="text-xs text-primary-500/40 mt-4">
									← or ↑ for Higher, → or ↓ for Lower, Space to replay
								</p>
							</div>
						) : (
							<div className="text-center">
								{/* Result */}
								<div className={`text-5xl lg:text-6xl mb-4 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
									{isCorrect ? "✓" : "✗"}
								</div>
								<div className={`text-2xl font-bold mb-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
									{isCorrect ? "Correct!" : "Nope!"}
								</div>
								{!isCorrect && (
									<div className="text-primary-400 mb-4">
										It was <span className="font-medium text-primary-200">{answer}</span>
									</div>
								)}
								{!autoContinue && (
									<>
										<button
											type="button"
											onClick={handleNewRound}
											className="mt-4 px-6 py-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-200 border border-primary-500/50 rounded-lg font-medium transition-all"
										>
											Next
										</button>
										<p className="text-xs text-primary-500/40 mt-3">
											Press Space for next
										</p>
									</>
								)}
							</div>
						)}
					</div>

					{/* Auto-continue toggle */}
					<div className="flex justify-center">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={autoContinue}
								onChange={(e) => {
									setAutoContinue(e.target.checked);
									// If enabling while on result screen, auto-advance
									if (e.target.checked && isCorrect !== null) {
										setTimeout(() => handleNewRound(), 300);
									}
								}}
								className="w-4 h-4 rounded border-primary-500/30 bg-gray-800 text-primary-500 focus:ring-primary-500/50"
							/>
							<span className="text-sm text-primary-300">Auto-continue</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
