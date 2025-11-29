import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Note, Scale } from "tonal";
import NavBar from "../components/NavBar";
import { FLAT_TO_SHARP } from "../useful";

export default function WhatScale() {
	const [notes, setNotes] = useState("");
	const [detectedScales, setDetectedScales] = useState([]);

	const handleInputChange = (e) => {
		const inputNotes = e.target.value
			.split(",")
			.map((note) => convertToSharp(note.trim()));

		setNotes(e.target.value);

		if (inputNotes.some((note) => note)) {
			const scales = Scale.detect(inputNotes).filter(
				(scaleName) => !scaleName.toLowerCase().includes("chromatic"),
			);
			setDetectedScales(scales);
		} else {
			setDetectedScales([]);
		}
	};

	const convertToSharp = (note) => {
		const { pc, oct } = Note.get(Note.simplify(note));
		return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
	};

	const getFretboardUrl = (scaleName) => {
		const params = new URLSearchParams();
		const spaceIndex = scaleName.indexOf(" ");
		const key = scaleName.substring(0, spaceIndex);
		const scale = scaleName.substring(spaceIndex + 1);

		params.set("key", key);
		params.set("scale", scale.toLowerCase());
		return `/fret?${params.toString()}`;
	};

	const renderScaleNotes = (scaleNotes, inputNotes) => {
		if (!scaleNotes || scaleNotes.length === 0) return null;

		const renderedNotes = scaleNotes.map((scaleNote) => {
			const sharpNote = convertToSharp(scaleNote);
			if (inputNotes.includes(sharpNote)) {
				return (
					<span
						className="px-1 border border-primary-500 text-primary-400 font-semibold"
						key={sharpNote}
					>
						{sharpNote}
					</span>
				);
			}
			return (
				<span className="px-1" key={sharpNote}>
					{sharpNote}
				</span>
			);
		});

		return renderedNotes.reduce((prev, curr, i) => {
			if (i === 0) return [curr];
			return [...prev, ", ", curr];
		}, []);
	};

	return (
		<div className="flex flex-col h-screen">
			<NavBar />
			<div className="flex flex-col flex-grow gap-6 p-6">
			<div className="w-full bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 p-4 rounded-lg">
				<h2 className="text-2xl font-semibold text-gray-200 mb-4">
					What is this scale?
				</h2>
				<p className="text-gray-300 mb-6">
					Input notes below (separated by commas). The{" "}
					<strong>first note</strong> you enter is considered the{" "}
					<strong>tonic</strong> of the scale. Use sharps (
					<code className="bg-gray-800 px-1 rounded">C#</code> instead of{" "}
					<code className="bg-gray-800 px-1 rounded">Db</code>)
				</p>
				<input
					className="w-full bg-gray-800 border border-primary-500/20 rounded-lg p-4 text-xl text-center text-gray-200 focus:border-primary-500 focus:outline-none"
					type="text"
					placeholder="Enter notes separated by commas (e.g. C, D#, E, F, G, A#, B)"
					value={notes}
					onChange={handleInputChange}
				/>
			</div>

			{detectedScales.length > 0 && (
				<div className="flex-grow bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 p-4 rounded-lg overflow-auto">
					<h3 className="text-lg font-semibold text-gray-200 mb-4">
						Detected Scales:
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{detectedScales.map((scaleName, index) => {
							const scaleInfo = Scale.get(scaleName);
							return (
								<Link
									to={getFretboardUrl(scaleName)}
									key={index.toString()}
									className="bg-gray-800/50 p-4 rounded-lg border border-primary-500/10 hover:border-primary-500/30 transition-colors"
								>
									<div className="font-semibold text-primary-400 mb-2">
										{scaleName}
									</div>
									<div className="text-gray-300">
										{renderScaleNotes(
											scaleInfo.notes,
											notes
												.split(",")
												.map((note) => Note.simplify(note.trim())),
										)}
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			)}
			</div>
		</div>
	);
}
