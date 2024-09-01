import React, { useState } from "react";
import useNotePlayer from "./hooks/useNotePlayer.js";

const NotePlayer = ({ notes, initialTempo, instrumentType }) => {
  const [tempo, setTempo] = useState(initialTempo);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);

  useNotePlayer(
    notes,
    tempo,
    instrumentType,
    0.5, // volume
    0.5, // noteDuration
    setCurrentNoteIndex
  );

  const handleTempoChange = (e) => {
    const newTempo = Number(e.target.value);
    if (newTempo > 0) {
      setTempo(newTempo);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
      }}>
      <h3>{instrumentType}</h3>
      <div>
        <strong>Current Note:</strong>{" "}
        {currentNoteIndex !== null ? notes[currentNoteIndex] : "None"}
      </div>
      <div style={{ margin: "10px 0" }}>
        {notes.map((note, index) => (
          <span
            key={index}
            style={{
              fontWeight: index === currentNoteIndex ? "bold" : "normal",
              marginRight: "8px",
            }}>
            {note}
          </span>
        ))}
      </div>
      <label>
        <strong>Tempo:</strong>{" "}
        <input
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          min="1"
          style={{ width: "60px" }}
        />
        {" BPM"}
      </label>
    </div>
  );
};

export default NotePlayer;
