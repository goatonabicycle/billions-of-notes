import React from "react";
import BassGuitar from "./instruments/BassGuitar";
import Guitar from "./instruments/Guitar";
import NotesGrid from "./instruments/NotesGrid";
import Piano from "./instruments/Piano";
import Ukelele from "./instruments/Ukelele";

const ShowMePanels = ({
	selectedPanelsToShow,
	currentIndex,
	randomNotes,
	notesInScale,
	selectedOctaves,
}) => {
	return (
		<div className="show-me-panels">
			{selectedPanelsToShow.includes("Guitar") && (
				<Guitar
					playbackIndex={currentIndex}
					notesToPlay={randomNotes}
					scaleNotes={notesInScale}
				/>
			)}

			{selectedPanelsToShow.includes("Piano Roll") && (
				<div className="center">
					<NotesGrid
						notes={randomNotes}
						notesInScale={notesInScale}
						octaveRange={selectedOctaves}
						activeIndex={currentIndex}
					/>
				</div>
			)}

			{selectedPanelsToShow.includes("Piano") && (
				<Piano
					playbackIndex={currentIndex}
					notesToPlay={randomNotes}
					scaleNotes={notesInScale}
				/>
			)}

			{selectedPanelsToShow.includes("Bass Guitar") && (
				<BassGuitar
					playbackIndex={currentIndex}
					notesToPlay={randomNotes}
					scaleNotes={notesInScale}
				/>
			)}

			{selectedPanelsToShow.includes("Ukelele") && (
				<Ukelele
					playbackIndex={currentIndex}
					notesToPlay={randomNotes}
					scaleNotes={notesInScale}
				/>
			)}
		</div>
	);
};

export default ShowMePanels;
