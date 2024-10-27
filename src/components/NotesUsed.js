import React, { useState } from "react";
import Modal from "./Modal.js";
import Select from "./Select";
import Button from "./Button.js";
import { PauseIcon } from "./Icons";

const NotesUsed = ({
	randomNotes,
	currentIndex,
	setRandomNotes,
	notesInScale,
	selectedOctaves,
	tieTogether,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedNoteForEditing, setSelectedNoteForEditing] = useState(null);

	const handleNoteChange = (newNote, newOctave) => {
		const newRandomNotes = [...randomNotes];
		newRandomNotes[selectedNoteForEditing] = `${newNote}${newOctave}`;
		setRandomNotes(newRandomNotes);
	};

	const handleEmptyNote = () => {
		const newRandomNotes = [...randomNotes];
		newRandomNotes[selectedNoteForEditing] = "";
		setRandomNotes(newRandomNotes);
		setIsModalOpen(false);
	};

	const groupNotes = () => {
		const groupedNotes = [];
		const originalIndexMap = [];

		randomNotes.forEach((note, index) => {
			if (!tieTogether || index === 0 || note !== randomNotes[index - 1]) {
				groupedNotes.push({ note: note, count: 1 });
				originalIndexMap.push(index);
			} else if (tieTogether && note === randomNotes[index - 1]) {
				groupedNotes[groupedNotes.length - 1].count++;
			}
		});

		return { groupedNotes, originalIndexMap };
	};

	const { groupedNotes, originalIndexMap } = groupNotes();

	return (
		<div className="flex flex-wrap justify-center items-center gap-0.5 my-6">
			{groupedNotes.map((item, i) => {
				const isCurrentNote = currentIndex === originalIndexMap[i];
				const baseStyle = `
          flex items-center justify-center min-h-[30px] px-3 
          border-2 border-pink-400/50 
          bg-pink-950/30 backdrop-blur-sm
          cursor-pointer transition-all
          hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]
          hover:border-pink-400
        `;

				const activeStyle = isCurrentNote
					? `
          font-bold underline
          shadow-[0_0_20px_rgba(236,72,153,0.5)]
          border-pink-400
        `
					: "";

				return (
					<div
						key={i.toString()}
						style={{ minWidth: `${Math.max(30 * item.count, 30)}px` }}
						className={`${baseStyle} ${activeStyle}`}
						onClick={() => {
							setSelectedNoteForEditing(originalIndexMap[i]);
							setIsModalOpen(true);
						}}
						onKeyUp={() => {
							setSelectedNoteForEditing(originalIndexMap[i]);
							setIsModalOpen(true);
						}}
					>
						{item.note}
						{item.count > 1 && ` (x${item.count})`}
					</div>
				);
			})}

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="flex flex-col gap-4">
					<Select
						id="noteSelect"
						label="Note"
						options={notesInScale.map((note) => ({ value: note, label: note }))}
						selectedValue={
							selectedNoteForEditing !== null
								? randomNotes[selectedNoteForEditing]?.slice(0, -1) ||
									notesInScale[0]
								: ""
						}
						onChange={(event) => {
							const newOctave =
								randomNotes[selectedNoteForEditing]?.slice(-1) ||
								selectedOctaves[0];
							handleNoteChange(event.target.value, newOctave);
						}}
					/>

					<Select
						id="octaveSelect"
						label="Octave"
						options={selectedOctaves.map((octave) => ({
							value: octave,
							label: octave.toString(),
						}))}
						selectedValue={
							randomNotes[selectedNoteForEditing]?.slice(-1) ||
							selectedOctaves[0]
						}
						onChange={(event) => {
							const newNote =
								randomNotes[selectedNoteForEditing]?.slice(0, -1) ||
								notesInScale[0];
							handleNoteChange(newNote, event.target.value);
						}}
					/>

					<div className="mt-2">
						<Button
							icon={PauseIcon}
							onClick={handleEmptyNote}
							text="Set to empty"
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default NotesUsed;
