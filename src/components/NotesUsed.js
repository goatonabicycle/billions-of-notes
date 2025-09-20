import React, { useState, useMemo } from "react";
import Button from "./Button.js";
import { PauseIcon } from "./Icons";
import Modal from "./Modal.js";
import Select from "./Select";

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

	const { groupedNotes, originalIndexMap } = useMemo(() => {
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
	}, [randomNotes, tieTogether]);

	const totalNotes = randomNotes.length;
	const columns = useMemo(() => {
		if (totalNotes % 4 === 0) return 4;
		if (totalNotes % 3 === 0) return 3;
		return 3;
	}, [totalNotes]);

	return (
		<div
			className="w-full"
			data-intro="These are the generated notes. This is what you're hearing right now and what the output is. All the buttons and controls exist to influence these notes"
			data-step="4"
		>
			<div
				className="grid gap-1"
				style={{
					gridTemplateColumns: `repeat(${columns}, 1fr)`,
					gridAutoRows: totalNotes > 25 ? "28px" : "36px",
				}}
			>
				{groupedNotes.map((item, i) => {
					const isCurrentNote = currentIndex === originalIndexMap[i];
					const isEmpty = !item.note;

					return (
						<button
							type="button"
							key={`note-group-${originalIndexMap[i]}`}
							className={`relative ${isCurrentNote ? "group/active" : "group"} w-full`}
							onClick={() => {
								setSelectedNoteForEditing(originalIndexMap[i]);
								setIsModalOpen(true);
							}}
							tabIndex={0}
						>
							<div
								className={`absolute inset-0 rounded bg-gradient-to-r ${
									isEmpty
										? "from-primary-600/10 to-secondary-600/10"
										: isCurrentNote
											? "from-primary-600/40 to-secondary-600/40 blur-sm"
											: "from-primary-600/20 to-secondary-600/20 group-hover:from-primary-600/40 group-hover:to-secondary-600/40 blur-sm"
								} transition-all duration-300 -z-10`}
							/>

							<div
								className={`h-full flex items-center justify-center rounded cursor-pointer border 
                ${isCurrentNote ? "border-primary-400/60" : "border-primary-400/30"}
                ${isEmpty ? "bg-primary-950/10" : "bg-primary-950/30"}
                backdrop-blur-sm
                ${
									isCurrentNote
										? "shadow-glow"
										: "group-hover:border-primary-400/60 group-hover:shadow-glow"
								}
                transition-all duration-300`}
							>
								<span
									className={`text-primary-100 font-medium tracking-wider truncate px-1
                  ${totalNotes > 50 ? "text-xs" : "text-sm"}
                  ${isEmpty ? "opacity-50" : ""}`}
								>
									{isEmpty ? "·" : item.note}{" "}
									{item.count > 1 && `(x${item.count})`}
								</span>

								<div
									className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 
                  ${isCurrentNote ? "w-full" : "w-0 group-hover:w-full"}
                  transition-all duration-0`}
								/>
							</div>
						</button>
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

export default React.memo(NotesUsed, (prevProps, nextProps) => {
	return (
		prevProps.randomNotes === nextProps.randomNotes &&
		prevProps.currentIndex === nextProps.currentIndex &&
		prevProps.notesInScale === nextProps.notesInScale &&
		prevProps.selectedOctaves === nextProps.selectedOctaves &&
		prevProps.tieTogether === nextProps.tieTogether
	);
});
