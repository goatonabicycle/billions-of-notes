import React, { useState, useEffect } from "react";
import NotePlayer from "./NotePlayer";

const notes = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
  "C6",
];

const NotePlayerContainer = () => {
  const [currentNote, setCurrentNote] = useState(notes[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % notes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentNote(notes[index]);
  }, [index]);

  return (
    <div>
      <NotePlayer note={currentNote} />
    </div>
  );
};

export default NotePlayerContainer;
