import React from "react";
import Guitar from "./Guitar";
import NotesGrid from "./NotesGrid";
import Piano from "./Piano";
import BassGuitar from "./BassGuitar";
import Ukelele from "./Ukelele";

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
        <div className="doodle-border center">
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
