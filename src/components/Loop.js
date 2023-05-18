import React, { useState, useEffect } from "react";
import NotesGrid from "./NotesGrid";
import NotePlayer from "./NotePlayer";

const LoopComponent = ({ notes, relevantNotes, bpm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
    }, calculateInterval(bpm));

    return () => {
      clearInterval(interval);
    };
  }, [notes, bpm]);

  const calculateInterval = (bpm) => {
    const millisecondsPerBeat = 60000 / bpm;
    return millisecondsPerBeat;
  };

  return (
    <div>
      {notes[currentIndex]}
      Notes: {relevantNotes}
      <NotePlayer noteName={notes[currentIndex]} />
      <NotesGrid
        notes={notes}
        relevantNotes={relevantNotes}
        activeIndex={currentIndex}
      />
    </div>
  );
};

export default LoopComponent;
