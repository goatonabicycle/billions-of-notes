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
	smallOctaveNumbers = false,
}) => {
	const [currentPosition, setCurrentPosition] = useState({
		stringIndex: 0,
		fret: 0,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStringIndex, setModalStringIndex] = useState(null);
	const [hasTuningChanged, setHasTuningChanged] = useState(false);

	const formatNote = useCallback((note) => {
		if (!note) return '';
		const { pc, oct } = Note.get(note);
		if (noteMode === 'sharp') {
			return (pc + (oct || '')).replace(/b/g, '#');
		}
		return Note.enharmonic(pc).replace(/#/g, 'b') + (oct || '');
	}, [noteMode]);

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
	}, [formatNote]);

	const fretboard = useMemo(() => {
		return strings.map(({ note, octave }, stringIndex) =>
			[...Array(numberOfFrets + 1)].map((e, fret) => ({
				note: getNote(note, octave, fret),
				stringIndex,
				fret,
			})),
		);
	}, [strings, getNote, numberOfFrets]);

	const flatFretboard = useMemo(() => fretboard.flat(), [fretboard]);

	useEffect(() => {
		const hasTuningChanged = selectedTuning.some(
			(tune, index) =>
				tune.note !== initialTuning[index].note ||
				tune.octave !== initialTuning[index].octave,
		);
		setHasTuningChanged(hasTuningChanged);
	}, [selectedTuning, initialTuning]);

	const notePositionsMap = useMemo(() => {
		const map = new Map();
		flatFretboard.forEach(pos => {
			const formatted = formatNote(pos.note);
			if (!map.has(formatted)) {
				map.set(formatted, []);
			}
			map.get(formatted).push(pos);
		});
		return map;
	}, [flatFretboard, formatNote]);

	useEffect(() => {
		const currentNote = notesToPlay[playbackIndex];
		if (!currentNote) return;

		const formattedCurrentNote = formatNote(currentNote);
		const positions = notePositionsMap.get(formattedCurrentNote);
		if (!positions || positions.length === 0) return;

		const { startFret, endFret } = getPreferredFretRange();
		let minDistance = Number.POSITIVE_INFINITY;
		let closestNote = null;

		for (const pos of positions) {
			if (pos.fret >= startFret && pos.fret <= endFret) {
				const distance = Math.abs(pos.stringIndex - currentPosition.stringIndex) +
					Math.abs(pos.fret - currentPosition.fret);
				if (distance < minDistance) {
					minDistance = distance;
					closestNote = pos;
				}
			}
		}

		if (!closestNote) {
			for (const pos of positions) {
				const distance = Math.abs(pos.stringIndex - currentPosition.stringIndex) +
					Math.abs(pos.fret - currentPosition.fret);
				if (distance < minDistance) {
					minDistance = distance;
					closestNote = pos;
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
	}, [notesToPlay, playbackIndex, getPreferredFretRange, notePositionsMap, currentPosition]);

	const { startFret, endFret } = getPreferredFretRange();

	const shouldShowFretMarker = useCallback((fretNumber) => {
		const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21];
		const doubleDotFrets = [12, 24];
		return (
			singleDotFrets.includes(fretNumber) || doubleDotFrets.includes(fretNumber)
		);
	}, []);

	const isDoubleDotFret = useCallback((fretNumber) => {
		return [12, 24].includes(fretNumber);
	}, []);

	const renderNote = useCallback((note) => {
		if (!note) return note;
		const { pc, oct } = Note.get(note);
		const pitch = noteMode === 'sharp' ? pc.replace(/b/g, '#') : Note.enharmonic(pc).replace(/#/g, 'b');
		return (
			<>
				{pitch}
				{oct && <span className={`${smallOctaveNumbers ? 'text-[0.8em]' : ''}`}>{oct}</span>}
			</>
		);
	}, [noteMode, smallOctaveNumbers]);

	return (
		<div className="flex flex-col items-center overflow-hidden pb-8 ">
			{hasTuningChanged && (
				<button
					className="px-3 py-1 mb-4 text-xs bg-primary-950/30 text-primary-300 border border-primary-400/30 
                     rounded hover:border-primary-400/60 hover:shadow-glow
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
				<br />
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
					"--preferred-start": startFret,
					"--preferred-range": endFret - startFret + 1,
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
					className="absolute top-4 bottom-8 z-10 border-2 border-primary-400/70
                     shadow-glow rounded-sm text-primary-400"
					style={{
						left: "calc((100% / var(--number-of-frets)) * var(--preferred-start))",
						width:
							"calc((100% / var(--number-of-frets)) * var(--preferred-range))",
						boxShadow: "0 0 8px currentColor, 0 0 16px currentColor, inset 0 0 8px currentColor",
						opacity: 0.8
					}}
				/>

				{fretboard.map((string, stringIndex) => (
					<div key={stringIndex} className="flex justify-between relative">
						{string.map((note, j) => {
							const formattedNote = note.note;
							const isCurrentNote =
								formattedNote === notesToPlay[playbackIndex] &&
								note.stringIndex === currentPosition.stringIndex &&
								note.fret === currentPosition.fret;

							const isScaleNote = scaleNotes.includes(formattedNote.slice(0, -1));
							const isNoteToPlay = notesToPlay.includes(formattedNote);

							const baseClasses = `
                flex items-center justify-center 
                min-w-[10px] w-full h-[40px]
                rounded
                border border-zinc-800
                transition-all duration-100 ease-out
                transform-gpu
              `;

							let bgColor = "bg-zinc-700/30";
							let textColor = "text-text-muted";
							let textDecoration = "";
							let highlight = "";

							if (isCurrentNote) {
								bgColor = "bg-gradient-to-br from-primary-400 to-primary-600";
								textColor = "text-white font-black";
								textDecoration = "underline";
								highlight =
									"animate-pulse-glow animate-note-bounce outline outline-4 outline-primary-300 ring-[3px] ring-primary-400/50 z-[100] relative";
							} else if (isNoteToPlay) {
								bgColor = "bg-secondary-500";
								textColor = "text-white font-bold";
								textDecoration = "underline";
							} else if (isScaleNote) {
								bgColor = "bg-secondary-600/30";
								textColor = "text-secondary-100/70";
							}

							const tuningClasses =
								j === 0
									? "border-primary-500/50 cursor-pointer shadow-glow-sm z-50"
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
									{j === 0 && <ChangeTuningIcon />}
									<span className={`${isCurrentNote ? "text-[1.1em] font-black" : "text-[0.8em]"} transition-all duration-100`}>
										{renderNote(note.note)}
									</span>
								</div>
							);
						})}
					</div>
				))}

				<div className="flex justify-between w-full mt-2 pt-2 border-t border-zinc-800">
					{Array.from({ length: numberOfFrets + 1 }, (_, i) => (
						<div
							key={i}
							className="flex justify-center w-full text-[0.6em] text-primary-300"
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

export default React.memo(Fretboard);
