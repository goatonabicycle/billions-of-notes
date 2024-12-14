import React, { useEffect, useState, useCallback, useMemo } from "react";
import { KEYS, OCTAVES } from "../useful";
import { ChangeTuningIcon } from "./Icons";
import Modal from "./Modal.js";
import Select from "./Select";
import { Scale, Note, Chord } from 'tonal';

const Fretboard = ({
	notesToPlay,
	playbackIndex,
	preferredPosition,
	fingerRange,
	scaleNotes,
	strings,
	selectedTuning,
	setSelectedTuning,
	initialTuning,
	numberOfFrets,
	noteMode = 'sharp', // TODO: Make this a setting once I have a nice UI. 
}) => {
	const [currentPosition, setCurrentPosition] = useState({
		stringIndex: 0,
		fret: 0,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStringIndex, setModalStringIndex] = useState(null);
	const [hasTuningChanged, setHasTuningChanged] = useState(false);

	function formatNote(note) {
		if (!note) return '';
		const { pc, oct } = Note.get(note);
		if (noteMode === 'sharp') {
			return (pc + (oct || '')).replace(/b/g, '#');
		}
		return Note.enharmonic(pc).replace(/#/g, 'b') + (oct || '');
	}

	const updateCurrentPosition = (newPosition) => {
		setCurrentPosition(newPosition);
	};

	const getPreferredFretRange = useCallback(() => {
		const startFret = preferredPosition;
		const endFret = preferredPosition + (fingerRange - 1);
		return { startFret, endFret };
	}, [preferredPosition, fingerRange]);

	const getNote = useCallback((stringNote, stringOctave, fret) => {
		const noteIndex = (KEYS.indexOf(stringNote) + fret) % KEYS.length;
		const octave = stringOctave + Math.floor((KEYS.indexOf(stringNote) + fret) / KEYS.length);
		const rawNote = `${KEYS[noteIndex]}${octave}`;
		return formatNote(rawNote);
	}, [noteMode]);

	const fretboard = useMemo(() => {
		return strings.map(({ note, octave }, stringIndex) =>
			[...Array(numberOfFrets + 1)].map((e, fret) => ({
				note: getNote(note, octave, fret),
				stringIndex,
				fret,
			})),
		);
	}, [strings, getNote, numberOfFrets, noteMode]);

	const flatFretboard = useMemo(() => fretboard.flat(), [fretboard]);

	useEffect(() => {
		const hasTuningChanged = selectedTuning.some(
			(tune, index) =>
				tune.note !== initialTuning[index].note ||
				tune.octave !== initialTuning[index].octave,
		);
		setHasTuningChanged(hasTuningChanged);
	}, [selectedTuning, initialTuning]);

	useEffect(() => {
		const currentNote = notesToPlay[playbackIndex];
		if (!currentNote) return;

		const formattedCurrentNote = formatNote(currentNote);
		const { startFret, endFret } = getPreferredFretRange();
		let minDistance = Number.POSITIVE_INFINITY;
		let closestNote;

		for (const note of flatFretboard) {
			const formattedNote = formatNote(note.note);
			if (
				formattedNote === formattedCurrentNote &&
				note.fret >= startFret &&
				note.fret <= endFret
			) {
				const distance = Math.abs(note.stringIndex - currentPosition.stringIndex) +
					Math.abs(note.fret - currentPosition.fret);
				if (distance < minDistance) {
					minDistance = distance;
					closestNote = note;
				}
			}
		}

		if (!closestNote) {
			for (const note of flatFretboard) {
				if (formatNote(note.note) === formattedCurrentNote) {
					const distance = Math.abs(note.stringIndex - currentPosition.stringIndex) +
						Math.abs(note.fret - currentPosition.fret);
					if (distance < minDistance) {
						minDistance = distance;
						closestNote = note;
					}
				}
			}
		}

		if (closestNote && (closestNote.stringIndex !== currentPosition.stringIndex ||
			closestNote.fret !== currentPosition.fret)) {
			updateCurrentPosition({
				stringIndex: closestNote.stringIndex,
				fret: closestNote.fret,
			});
		}
	}, [notesToPlay, playbackIndex, getPreferredFretRange, flatFretboard, currentPosition]);

	const { startFret, endFret } = getPreferredFretRange();
	const preferredRangeStyle = {
		left: `calc((100% / ${numberOfFrets + 1}) * ${startFret})`,
		width: `calc((100% / ${numberOfFrets + 1}) * ${endFret - startFret + 1})`,
	};

	const shouldShowFretMarker = (fretNumber) => {
		const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21];
		const doubleDotFrets = [12, 24];
		return (
			singleDotFrets.includes(fretNumber) || doubleDotFrets.includes(fretNumber)
		);
	};

	const isDoubleDotFret = (fretNumber) => {
		return [12, 24].includes(fretNumber);
	};

	return (
		<div className="flex flex-col items-center overflow-hidden pb-8 ">
			{hasTuningChanged && (
				<button
					className="px-3 py-1 mb-4 text-xs bg-pink-950/30 text-pink-300 border border-pink-400/30 
                     rounded hover:border-pink-400/60 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                     transition-all duration-300"
					onClick={() =>
						setSelectedTuning(JSON.parse(JSON.stringify(initialTuning)))
					}
					type="button"
				>
					Reset Tuning
				</button>
			)}

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Select
					id="noteSelect"
					label="Note"
					options={KEYS.map((key) => ({ value: key, label: key }))}
					selectedValue={selectedTuning[modalStringIndex]?.note || ""}
					onChange={(event) => {
						setSelectedTuning((prevTuning) => {
							const newTuning = [...prevTuning];
							newTuning[modalStringIndex].note = event.target.value;
							return newTuning;
						});
					}}
				/>
				<Select
					id="octaveSelect"
					label="Octave"
					options={OCTAVES.map((octave) => ({
						value: octave,
						label: octave.toString(),
					}))}
					selectedValue={selectedTuning[modalStringIndex]?.octave || ""}
					onChange={(event) => {
						setSelectedTuning((prevTuning) => {
							const newTuning = [...prevTuning];
							newTuning[modalStringIndex].octave = Number.parseInt(
								event.target.value,
								10,
							);
							return newTuning;
						});
					}}
				/>
			</Modal>

			<div
				className="relative text-[calc(4px+2vmin)] flex flex-col w-full gap-2"
				style={{
					"--number-of-frets": numberOfFrets + 1,
					"--preferred-start": getPreferredFretRange().startFret,
					"--preferred-range":
						getPreferredFretRange().endFret -
						getPreferredFretRange().startFret +
						1,
				}}
			>
				<div className="flex justify-between w-full h-4">
					{Array.from({ length: numberOfFrets + 1 }, (_, i) => (
						<div
							key={`marker-${i}`}
							className="flex flex-col items-center justify-end w-full"
						>
							{shouldShowFretMarker(i) && (
								<div className="flex gap-1">
									<div className="w-2 h-2 rounded-full bg-zinc-600" />
									{isDoubleDotFret(i) && (
										<div className="w-2 h-2 rounded-full bg-zinc-600" />
									)}
								</div>
							)}
						</div>
					))}
				</div>

				<div
					className="absolute top-4 bottom-8 z-10 border-2 border-pink-500/50
                     shadow-[0_0_10px_5px_rgba(236,72,153,0.2)]"
					style={{
						left: "calc((100% / var(--number-of-frets)) * var(--preferred-start))",
						width:
							"calc((100% / var(--number-of-frets)) * var(--preferred-range))",
					}}
				/>

				{fretboard.map((string, stringIndex) => (
					<div key={stringIndex} className="flex justify-between relative">
						{string.map((note, j) => {
							const isCurrentNote =
								note.note === notesToPlay[playbackIndex] &&
								note.stringIndex === currentPosition.stringIndex &&
								note.fret === currentPosition.fret;

							const isScaleNote = scaleNotes.includes(formatNote(note.note).slice(0, -1));
							const isNoteToPlay = notesToPlay.some(playNote =>
								formatNote(playNote) === formatNote(note.note)
							);

							const baseClasses = `
                flex items-center justify-center 
                min-w-[10px] w-full h-[40px]
                rounded
                border border-zinc-800
                transition-colors duration-150
              `;

							let bgColor = "bg-zinc-700/30";
							let textColor = "text-zinc-400";
							let textDecoration = "";
							let highlight = "";

							if (isCurrentNote) {
								bgColor = "bg-pink-500";
								textColor = "text-white";
								textDecoration = "underline";
								highlight =
									"outline outline-2 outline-cyan ring-[2px] ring-cyan/35";
							} else if (isNoteToPlay) {
								bgColor = "bg-purple-500";
								textColor = "text-white font-bold";
								textDecoration = "underline";
							} else if (isScaleNote) {
								bgColor = "bg-cyan-600/30";
								textColor = "text-cyan-100/70";
							}

							const tuningClasses =
								j === 0
									? "border-pink-500/50 cursor-pointer shadow-[0_0_5px_rgba(236,72,153,0.3)] z-50"
									: "";

							const classes = `
								${baseClasses} 
								${bgColor} 
								${tuningClasses} 
								${textColor}
								${textDecoration}
								${highlight}
							`;

							return (
								<div
									key={j}
									className={classes}
									onClick={() => {
										if (j === 0) {
											setModalStringIndex(stringIndex);
											setIsModalOpen(true);
										}
									}}
								>
									{j === 0 && ChangeTuningIcon}
									<span className="text-[0.7em]">{note.note}</span>
								</div>
							);
						})}
					</div>
				))}

				<div className="flex justify-between w-full mt-2 pt-2 border-t border-zinc-800">
					{Array.from({ length: numberOfFrets + 1 }, (_, i) => (
						<div
							key={i}
							className="flex justify-center w-full text-[0.6em] text-pink-300"
						>
							{i}
						</div>
					))}
				</div>

				{/* <div className="debug-info-block">
					<div>hasTuningChanged: {hasTuningChanged.toString()}</div>
					<div>Selected Tuning: {JSON.stringify(selectedTuning)}</div>
					<div>Initial Tuning: {JSON.stringify(initialTuning)}</div>
				</div> */}
			</div>
		</div>
	);
};

export default Fretboard;
