import React, { useEffect } from "react";
import NotePlayer from "./NotePlayer";

const LoopComponent = ({
  notes,
  notesInMode,
  bpm,
  octaveRange,
  isPlaying,
  setCurrentNote,
  currentIndex,
  setCurrentIndex,
}) => {
  useEffect(() => {
    if (!setCurrentIndex || notes.length === 0) return;

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

  return <NotePlayer note={notes[currentIndex] || "C3"} />;
};

export default LoopComponent;
