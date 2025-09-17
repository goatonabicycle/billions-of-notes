import React from "react";
import { MidiNumbers, Piano as ReactPiano } from "react-piano";
import { FLAT_TO_SHARP } from "../../useful";
import "react-piano/dist/styles.css";
import "./Piano.css";

const Piano = ({ notesToPlay, playbackIndex, scaleNotes }) => {
	const convertFlatToSharp = (note) => {
		const matches = note.match(/([A-G][b#]?)(\d+)/);
		if (!matches) return note;

		const [, notePart, octave] = matches;
		const sharpNote = FLAT_TO_SHARP[notePart] || notePart;

		return sharpNote + octave;
	};

	const renderNoteLabel = ({ midiNumber }) => {
		const attributes = MidiNumbers.getAttributes(midiNumber);
		let noteLabel = attributes.note + attributes.octave;
		noteLabel = convertFlatToSharp(noteLabel);

		const correctNoteLabel =
			noteLabel.length > 3
				? noteLabel.substring(0, 3)
				: noteLabel.substring(0, 2);

		return (
			<div
				style={{
					textAlign: "center",
					pointerEvents: "none",
					width: "100%",
					marginTop: "10px",
					color: "black",
					fontSize: "0.75rem",
					lineHeight: "20px",
				}}
			>
				{correctNoteLabel}
			</div>
		);
	};

	const noteRange = {
		first: MidiNumbers.fromNote("c1"),
		last: MidiNumbers.fromNote("c6"),
	};

	const currentNote = notesToPlay[playbackIndex];
	let activeNote;
	if (currentNote) {
		activeNote = MidiNumbers.fromNote(currentNote);
	}

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20">
			<div className="text-primary-300 text-xl min-w-[100px] p-4">Piano</div>
			<div className="piano-container">
				<ReactPiano
					noteRange={noteRange}
					playNote={() => { }}
					stopNote={() => { }}
					activeNotes={[activeNote]}
					renderNoteLabel={renderNoteLabel}
				/>
			</div>
		</div>
	);
};

export default Piano;