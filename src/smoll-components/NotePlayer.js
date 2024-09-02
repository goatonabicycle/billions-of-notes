import React, { useState } from "react";
import useNotePlayer from "./hooks/useNotePlayer.js";
import "./NotePlayer.css";

const NotePlayer = ({
  notes,
  initialTempo,
  initialVolume = 20,
  instrumentType,
}) => {
  const [tempo, setTempo] = useState(initialTempo);
  const [volume, setVolume] = useState(initialVolume);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useNotePlayer(
    notes,
    tempo,
    instrumentType,
    volume / 100,
    0.5,
    setCurrentNoteIndex
  );

  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="note-player compact">
      <h3 className="note-player-title">{instrumentType}</h3>

      <div className="note-player-notes">
        {notes.map((note, index) => (
          <span
            key={index}
            className={`note ${index === currentNoteIndex ? "active" : ""}`}>
            {note}
          </span>
        ))}
      </div>
      <div className="note-player-controls compact">
        <label>
          <input
            type="range"
            value={tempo}
            onChange={handleTempoChange}
            min="10"
            max="500"
            step="10"
            className="input-tempo"
          />
          <span>{tempo} BPM</span>
        </label>
        <label>
          <input
            type="range"
            value={volume}
            onChange={handleVolumeChange}
            min="0"
            max="100"
            step="1"
            className="input-volume"
          />
          <span>{volume}</span>
        </label>
      </div>
      <div className="note-player-info">
        <button
          className="info-button"
          onClick={toggleInfo}>
          ℹ️ Info
        </button>
        {showInfo && (
          <div className="info-panel">
            <p>
              <strong>Current Note:</strong>{" "}
              {currentNoteIndex !== null ? notes[currentNoteIndex] : "None"}
            </p>
            <p>
              <strong>Current Index:</strong> {currentNoteIndex}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePlayer;
