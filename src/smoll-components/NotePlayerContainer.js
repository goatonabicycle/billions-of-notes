import React, { useState } from "react";
import NotePlayer from "./NotePlayer";
import "../Smoll.css";

const notes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

const NotePlayerContainer = () => {
  const [tempo, setTempo] = useState(100);
  const [currentNote, setCurrentNote] = useState(null);

  const handleNoteChange = (note) => {
    setCurrentNote(note);
  };

  return (
    <div>
      <NotePlayer
        notes={notes}
        tempo={tempo}
        onNoteChange={handleNoteChange}
      />
      <label>
        Tempo:
        <input
          type="number"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
        />
      </label>
      <div>Current Note: {currentNote}</div>
    </div>
  );
};

export default NotePlayerContainer;
