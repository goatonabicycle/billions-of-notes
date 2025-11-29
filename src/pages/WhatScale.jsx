import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Note, Scale } from "tonal";
import NavBar from "../components/NavBar";
import { FLAT_TO_SHARP } from "../useful";

export default function WhatScale() {
	const [rawInput, setRawInput] = useState("");

	const convertToSharp = (note) => {
		const { pc, oct } = Note.get(Note.simplify(note));
		return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
	};

	// Smart note parsing - handles "C D E", "C,D,E", "CDE", "C# D Eb", etc.
	const parseNotes = (input) => {
		if (!input.trim()) return [];

		// First, normalize common separators to spaces
		let normalized = input
			.replace(/,/g, " ")
			.replace(/\s+/g, " ")
			.trim();

		// Smart tokenization: split on spaces OR between a note letter and next note letter
		// This handles "CDEFGAB" → ["C","D","E","F","G","A","B"]
		// But keeps "C#" and "Db" together
		const tokens = [];
		let current = "";

		for (let i = 0; i < normalized.length; i++) {
			const char = normalized[i].toUpperCase();

			if (char === " ") {
				if (current) {
					tokens.push(current);
					current = "";
				}
				continue;
			}

			// If it's a note letter (A-G)
			if (char >= "A" && char <= "G") {
				// If we already have content and it doesn't end with # or b, start new token
				if (current && !current.endsWith("#") && !current.toLowerCase().endsWith("b")) {
					tokens.push(current);
					current = char;
				} else if (current) {
					// Previous was a modifier waiting for... nothing? Push and start new
					tokens.push(current);
					current = char;
				} else {
					current = char;
				}
			} else if (char === "#" || char.toLowerCase() === "b") {
				// Accidental - attach to current
				current += char === "#" ? "#" : "b";
			}
			// Ignore other characters
		}

		if (current) {
			tokens.push(current);
		}

		// Validate and convert each token
		return tokens
			.map((t) => {
				const note = Note.get(t);
				if (note.empty) return null;
				return convertToSharp(t);
			})
			.filter(Boolean)
			.filter((note, index, arr) => arr.indexOf(note) === index); // Remove duplicates
	};

	const parsedNotes = useMemo(() => parseNotes(rawInput), [rawInput]);

	const detectedScales = useMemo(() => {
		if (parsedNotes.length === 0) return [];

		const scales = Scale.detect(parsedNotes).filter(
			(scaleName) => !scaleName.toLowerCase().includes("chromatic"),
		);

		// Calculate match info and sort by relevance
		return scales.map((scaleName) => {
			const scaleInfo = Scale.get(scaleName);
			const scaleNotesSharp = scaleInfo.notes?.map(convertToSharp) || [];

			// How many of the SCALE's notes are covered by input?
			const coveredCount = scaleNotesSharp.filter((n) => parsedNotes.includes(n)).length;
			const coveragePercent = scaleNotesSharp.length > 0
				? Math.round((coveredCount / scaleNotesSharp.length) * 100)
				: 0;

			// Exact match = input covers ALL notes in scale (e.g., 7 notes for a 7-note scale)
			const isExactMatch = scaleNotesSharp.length > 0 && coveredCount === scaleNotesSharp.length;

			return {
				name: scaleName,
				scaleInfo,
				scaleNotesSharp,
				coveredCount,
				coveragePercent,
				isExactMatch,
			};
		}).filter((scale) => scale.scaleNotesSharp.length > 0) // Filter out invalid scales
		.sort((a, b) => {
			// Exact matches first, then by coverage percentage, then alphabetically
			if (a.isExactMatch !== b.isExactMatch) return b.isExactMatch ? 1 : -1;
			if (a.coveragePercent !== b.coveragePercent) return b.coveragePercent - a.coveragePercent;
			return a.name.localeCompare(b.name);
		});
	}, [parsedNotes]);

	const handleInputChange = (e) => {
		setRawInput(e.target.value);
	};

	const parseScaleName = (scaleName) => {
		const spaceIndex = scaleName.indexOf(" ");
		const key = scaleName.substring(0, spaceIndex);
		const scale = scaleName.substring(spaceIndex + 1);
		return { key, scale };
	};

	const getFretboardUrl = (scaleName) => {
		const { key, scale } = parseScaleName(scaleName);
		const params = new URLSearchParams();
		params.set("key", key);
		params.set("scale", scale);
		return `/fret?${params.toString()}`;
	};

	const getRiffUrl = (scaleName) => {
		const { key, scale } = parseScaleName(scaleName);
		const params = new URLSearchParams();
		params.set("key", key);
		params.set("scale", scale);
		return `/riff?${params.toString()}`;
	};

	const renderScaleNotes = (scaleNotesSharp) => {
		if (!scaleNotesSharp || scaleNotesSharp.length === 0) return null;

		return (
			<div className="flex flex-wrap gap-1">
				{scaleNotesSharp.map((note) => {
					const isMatched = parsedNotes.includes(note);
					return (
						<span
							key={note}
							className={`px-1.5 py-0.5 text-xs rounded ${
								isMatched
									? "bg-primary-500/30 border border-primary-500/50 text-primary-200 font-medium"
									: "text-primary-400/50"
							}`}
						>
							{note}
						</span>
					);
				})}
			</div>
		);
	};

	return (
		<div className="flex flex-col h-screen">
			<NavBar />
			<div className="flex flex-col flex-grow gap-4 p-4">
				{/* Input Section */}
				<div className="flex justify-center">
					<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 p-4 rounded-lg max-w-2xl w-full">
						<div className="flex flex-col gap-3">
							<div className="flex items-center justify-between">
								<span className="text-xs font-medium text-primary-400 uppercase tracking-wider">
									Scale Finder
								</span>
								<span className="text-xs text-primary-400/60">
									First note = tonic
								</span>
							</div>
							<input
								className="w-full bg-gray-800/50 border border-primary-500/20 rounded px-3 py-2 text-sm text-primary-100 placeholder-primary-400/40 focus:border-primary-500/50 focus:outline-none transition-colors"
								type="text"
								placeholder="Type notes: C D E F G A B  or  CDEFGAB  or  C# D# F# G# A#"
								value={rawInput}
								onChange={handleInputChange}
								autoComplete="off"
								spellCheck="false"
							/>

							{/* Parsed notes display */}
							{parsedNotes.length > 0 && (
								<div className="flex items-center gap-2">
									<span className="text-xs text-primary-400/60">Detected:</span>
									<div className="flex flex-wrap gap-1">
										{parsedNotes.map((note, i) => (
											<span
												key={`${note}-${i}`}
												className="px-2 py-0.5 bg-primary-500/20 border border-primary-500/40 text-primary-200 text-xs font-medium rounded"
											>
												{note}
											</span>
										))}
									</div>
								</div>
							)}

							{rawInput && parsedNotes.length === 0 && (
								<p className="text-xs text-primary-400/60">
									No valid notes detected. Use letters A-G, optionally with # or b.
								</p>
							)}

							{parsedNotes.length > 0 && detectedScales.length === 0 && (
								<p className="text-xs text-primary-400/60">
									No matching scales found. Try adding or removing notes.
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Results Section */}
				{detectedScales.length > 0 && (
					<div className="flex-grow bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 rounded-lg overflow-auto">
						<div className="p-3 border-b border-primary-500/10 flex items-center justify-between">
							<span className="text-xs font-medium text-primary-400/80">
								{detectedScales.length} scale{detectedScales.length !== 1 ? "s" : ""} found
							</span>
							{detectedScales.some((s) => s.isExactMatch) && (
								<span className="text-xs text-green-400/80">
									{detectedScales.filter((s) => s.isExactMatch).length} exact match{detectedScales.filter((s) => s.isExactMatch).length !== 1 ? "es" : ""}
								</span>
							)}
						</div>
						<div className="p-3">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
								{detectedScales.map((scale, index) => (
									<div
										key={index.toString()}
										className={`p-3 rounded border transition-all ${
											scale.isExactMatch
												? "bg-green-900/20 border-green-500/30"
												: "bg-gray-800/30 border-primary-500/10"
										}`}
									>
										<div className="flex items-start justify-between gap-2 mb-2">
											<div className="text-xs font-medium text-primary-200">
												{scale.name}
											</div>
											<div
												className={`text-xs px-1.5 py-0.5 rounded ${
													scale.isExactMatch
														? "bg-green-500/20 text-green-300"
														: "bg-primary-500/10 text-primary-400"
												}`}
											>
												{scale.coveragePercent}%
											</div>
										</div>
										<div className="mb-3">
											{renderScaleNotes(scale.scaleNotesSharp)}
										</div>
										<div className="flex gap-2">
											<Link
												to={getFretboardUrl(scale.name)}
												className="flex-1 px-2 py-1.5 text-xs text-center font-medium bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 hover:text-primary-200 border border-primary-500/30 hover:border-primary-500/50 rounded transition-all"
											>
												Fretboard
											</Link>
											<Link
												to={getRiffUrl(scale.name)}
												className="flex-1 px-2 py-1.5 text-xs text-center font-medium bg-secondary-500/20 hover:bg-secondary-500/30 text-secondary-300 hover:text-secondary-200 border border-secondary-500/30 hover:border-secondary-500/50 rounded transition-all"
											>
												Riff
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Empty State */}
				{!rawInput && (
					<div className="flex-grow flex items-center justify-center">
						<div className="text-center max-w-md">
							<p className="text-sm text-primary-400/60 mb-4">
								Enter notes to find matching scales
							</p>
							<div className="space-y-2 text-xs text-primary-500/50">
								<p>Try typing:</p>
								<div className="flex flex-wrap justify-center gap-2">
									<code className="px-2 py-1 bg-gray-800/50 rounded">C D E F G A B</code>
									<code className="px-2 py-1 bg-gray-800/50 rounded">A B C# D E F# G#</code>
									<code className="px-2 py-1 bg-gray-800/50 rounded">CDEFGAB</code>
								</div>
								<p className="mt-3 text-primary-500/40">
									Spaces, commas, or nothing between notes all work
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
