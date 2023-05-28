import React, { useState, useEffect } from "react";
import NotesGrid from "./NotesGrid";
import NotePlayer from "./NotePlayer";

const LoopComponent = ({
  notes,
  notesInMode,
  bpm,
  octaveRange,
  isPlaying,
  setCurrentNote,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
      }, calculateInterval(bpm));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [notes, bpm, isPlaying]);

  const calculateInterval = (bpm) => {
    const millisecondsPerBeat = 60000 / bpm;
    return millisecondsPerBeat;
  };

  setCurrentNote(notes[currentIndex]);

  return (
    <div className="loop-grid-contain">
      <NotePlayer note={notes[currentIndex] || "C3"} />
      <NotesGrid
        notes={notes}
        notesInMode={notesInMode}
        octaveRange={octaveRange}
        activeIndex={currentIndex}
      />
    </div>
  );
};

export default LoopComponent;
