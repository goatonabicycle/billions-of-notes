import React, { useState } from "react";
import NotePlayer from "./NotePlayer";

const notes = [
  "C3",
  "D3",
  "E3",
  "F3",
  "G3",
  "A3",
  "B3",
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
];

const NotePlayerContainer = () => {
  const [tempo, setTempo] = useState(600); // Tempo in BPM

  return (
    <div>
      <NotePlayer
        notes={notes}
        tempo={tempo}
      />
      <div>
        <label>
          Tempo:
          <input
            type="number"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default NotePlayerContainer;
