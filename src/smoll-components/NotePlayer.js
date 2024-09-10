import React, { useState, useCallback } from "react";
import useNotePlayer from "./hooks/useNotePlayer.js";
import { useStorage } from "./hooks/useLocalStorage.js";
import "./NotePlayer.css";
import NotesGrid from "./NotesGrid.js";
import {
  mapToSelectOptions,
  KEYS,
  DEFAULT_KEY,
  DEFAULT_SCALE,
} from "./useful.js";
import { Scale } from "tonal";
import Select from "./Select.js";

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
  const [showPainoRoll, setShowPianoRoll] = useState(true);

  const scales = Scale.names();

  // input state is anything that ends up changing the randomNotes you got
  const [inputState, _setInputState] = useStorage("inputState", {
    key: DEFAULT_KEY,
    scale: DEFAULT_SCALE,
  });
  const setInputState = useCallback(_setInputState, [_setInputState]);

  const handleInputChange = useCallback(
    (event) => {
      setInputState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setInputState]
  );

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

  const togglePainoRoll = () => {
    setShowPianoRoll(!showPainoRoll);
  };

  return (
    <div className="note-player compact">
      <h3 className="note-player-title">{instrumentType}</h3>

      <div className="input-grid">
        <Select
          id="key"
          name="key"
          label="Key:"
          options={mapToSelectOptions(KEYS)}
          onChange={handleInputChange}
          selectedValue={inputState.key}
        />
        <Select
          id="scale"
          name="scale"
          label="Scale:"
          options={mapToSelectOptions(scales)}
          onChange={handleInputChange}
          selectedValue={inputState.scale}
        />
      </div>

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
          onClick={togglePainoRoll}>
          Piano Roll
        </button>
        {showPainoRoll && (
          <div className="info-panel">
            <NotesGrid
              octaveRange={[1]}
              notesInScale={[
                { note: "C", octave: 1 },
                { note: "E", octave: 1 },
              ]}
              notes={notes}
              activeIndex={currentNoteIndex}
            />
          </div>
        )}
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
