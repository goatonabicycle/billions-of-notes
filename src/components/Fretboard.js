import React, { useEffect, useState, useCallback, useMemo } from "react";
import { KEYS, OCTAVES } from "../useful";
import { ChangeTuningIcon } from "./Icons";
import Modal from "./Modal.js";
import Select from "./Select";
import "./Fretboard.css";

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
}) => {
	const [currentPosition, setCurrentPosition] = useState({
		stringIndex: 0,
		fret: 0,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStringIndex, setModalStringIndex] = useState(null);
	const [hasTuningChanged, setHasTuningChanged] = useState(false);

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
		const octave =
			stringOctave +
			Math.floor((KEYS.indexOf(stringNote) + fret) / KEYS.length);
		return `${KEYS[noteIndex]}${octave}`;
	}, []);

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
		const hasTuningChanged = selectedTuning.some((tune, index) => {
			return (
				tune.note !== initialTuning[index].note ||
				tune.octave !== initialTuning[index].octave
			);
		});
		setHasTuningChanged(hasTuningChanged);
	}, [selectedTuning, initialTuning]);

	useEffect(() => {
		const currentNote = notesToPlay[playbackIndex];
		if (!currentNote) {
			return;
		}

		const { startFret, endFret } = getPreferredFretRange();
		let minDistance = Number.POSITIVE_INFINITY;
		let closestNote;

		for (const note of flatFretboard) {
			if (
				note.note === currentNote &&
				note.fret >= startFret &&
				note.fret <= endFret
			) {
				const distance =
					Math.abs(note.stringIndex - currentPosition.stringIndex) +
					Math.abs(note.fret - currentPosition.fret);
				if (distance < minDistance) {
					minDistance = distance;
					closestNote = note;
				}
			}
		}

		if (!closestNote) {
			for (const note of flatFretboard) {
				if (note.note === currentNote) {
					const distance =
						Math.abs(note.stringIndex - currentPosition.stringIndex) +
						Math.abs(note.fret - currentPosition.fret);
					if (distance < minDistance) {
						minDistance = distance;
						closestNote = note;
					}
				}
			}
		}

		if (
			closestNote &&
			(closestNote.stringIndex !== currentPosition.stringIndex ||
				closestNote.fret !== currentPosition.fret)
		) {
			updateCurrentPosition({
				stringIndex: closestNote.stringIndex,
				fret: closestNote.fret,
			});
		}
	}, [
		notesToPlay,
		playbackIndex,
		getPreferredFretRange,
		flatFretboard,
		currentPosition,
	]);

	return (
		<div className="fretboard-container">
			{hasTuningChanged && (
				<button
					className="rainbow-button reset-button"
					onClick={() =>
						setSelectedTuning(JSON.parse(JSON.stringify(initialTuning)))
					}
					onKeyUp={() =>
						setSelectedTuning(JSON.parse(JSON.stringify(initialTuning)))
					}
					type="button"
				>
					Reset
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
				className="fretboard"
				style={{
					"--number-of-frets": numberOfFrets + 1,
					"--preferred-start": getPreferredFretRange().startFret,
					"--preferred-range":
						getPreferredFretRange().endFret -
						getPreferredFretRange().startFret +
						1,
				}}
			>
				{fretboard.map((string, stringIndex) => (
					<div key={stringIndex.toString()} className="string">
						{string.map((note, j) => {
							const isCurrentNote =
								note.note === notesToPlay[playbackIndex] &&
								note.stringIndex === currentPosition.stringIndex &&
								note.fret === currentPosition.fret;

							const isScaleNote = scaleNotes.includes(note.note.slice(0, -1));
							const isNoteToPlay = notesToPlay.includes(note.note);

							let className = "fret";
							if (isCurrentNote) className += " highlight";
							if (isScaleNote) className += " scale-note";
							if (isNoteToPlay) className += " note-to-play";

							return (
								<div
									key={j.toString()}
									className={className + (j === 0 ? " tuning-adjuster" : "")}
									onClick={() => {
										if (j === 0) {
											setModalStringIndex(stringIndex);
											setIsModalOpen(true);
										}
									}}
									onKeyUp={() => {
										if (j === 0) {
											setModalStringIndex(stringIndex);
											setIsModalOpen(true);
										}
									}}
								>
									{j === 0 && ChangeTuningIcon}
									{note.note}
								</div>
							);
						})}
					</div>
				))}
			</div>
			<div className="fret-numbers">
				{Array.from({ length: numberOfFrets + 1 }, (_, i) => (
					<div key={i.toString()} className="fret-number">
						{i}
					</div>
				))}
			</div>
		</div>
	);
};

export default Fretboard;
