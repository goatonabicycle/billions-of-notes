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

	const getGridColumns = (total) => {
		if (total % 4 === 0) return 4;
		if (total % 3 === 0) return 3;
		return 3;
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
	const totalNotes = randomNotes.length;
	const columns = getGridColumns(totalNotes);

	return (
		<div className="w-full">
			<div
				className="grid gap-1"
				style={{
					gridTemplateColumns: `repeat(${columns}, 1fr)`,
					gridAutoRows: totalNotes > 25 ? '28px' : '36px'
				}}
			>
				{groupedNotes.map((item, i) => {
					const isCurrentNote = currentIndex === originalIndexMap[i];
					const isEmpty = !item.note;

					return (
						<div
							key={i}
							className={`relative ${isCurrentNote ? "group/active" : "group"}`}
							onClick={() => {
								setSelectedNoteForEditing(originalIndexMap[i]);
								setIsModalOpen(true);
							}}
							onKeyUp={() => {
								setSelectedNoteForEditing(originalIndexMap[i]);
								setIsModalOpen(true);
							}}
							role="button"
							tabIndex={0}
						>
							<div className={`absolute inset-0 rounded bg-gradient-to-r ${isEmpty
								? "from-pink-600/10 to-purple-600/10"
								: isCurrentNote
									? "from-pink-600/40 to-purple-600/40 blur-sm"
									: "from-pink-600/20 to-purple-600/20 group-hover:from-pink-600/40 group-hover:to-purple-600/40 blur-sm"
								} transition-all duration-300 -z-10`} />

							<div className={`h-full flex items-center justify-center rounded cursor-pointer border 
                ${isCurrentNote ? "border-pink-400/60" : "border-pink-400/30"}
                ${isEmpty ? "bg-pink-950/10" : "bg-pink-950/30"}
                backdrop-blur-sm
                ${isCurrentNote
									? "shadow-[0_0_15px_rgba(236,72,153,0.3)]"
									: "group-hover:border-pink-400/60 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]"}
                transition-all duration-300`}
							>
								<span className={`text-pink-100 font-medium tracking-wider truncate px-1
                  ${totalNotes > 50 ? 'text-xs' : 'text-sm'}
                  ${isEmpty ? 'opacity-50' : ''}`}
								>
									{isEmpty ? '·' : item.note} {item.count > 1 && `(x${item.count})`}
								</span>

								<div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 
                  ${isCurrentNote ? "w-full" : "w-0 group-hover:w-full"}
                  transition-all duration-0`}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="flex flex-col gap-4">
					<Select
						id="noteSelect"
						label="Note"
						options={notesInScale.map((note) => ({ value: note, label: note }))}
						selectedValue={
							selectedNoteForEditing !== null
								? randomNotes[selectedNoteForEditing]?.slice(0, -1) || notesInScale[0]
								: ""
						}
						onChange={(event) => {
							const newOctave = randomNotes[selectedNoteForEditing]?.slice(-1) || selectedOctaves[0];
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
							randomNotes[selectedNoteForEditing]?.slice(-1) || selectedOctaves[0]
						}
						onChange={(event) => {
							const newNote = randomNotes[selectedNoteForEditing]?.slice(0, -1) || notesInScale[0];
							handleNoteChange(newNote, event.target.value);
						}}
					/>

					<div className="mt-2">
						<Button icon={PauseIcon} onClick={handleEmptyNote} text="Set to empty" />
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default NotesUsed;