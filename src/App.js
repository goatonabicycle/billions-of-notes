import React, { useState, useEffect, useMemo } from "react";
import { Mode, Note } from "tonal";
import {
  DEFAULT_KEY,
  DEFAULT_MODE,
  DEFAULT_TEMPO,
  DEFAULT_NUMBER_OF_NOTES,
  DEFAULT_OCTAVE,
  DEFAULT_OCTAVE_RANGE,
  KEYS,
  mapToSelectOptions,
} from "./useful";

import Select from "./components/Select";
import Slider from "./components/Slider";

import Loop from "./components/Loop";
import "./App.css";

function App() {
  const modes = Mode.names(); // Todo: rename "scales" to "modes"
  const [selectedKey, setSelectedKey] = useState(DEFAULT_KEY);
  const [selectedMode, setSelectedMode] = useState(DEFAULT_MODE);
  const [selectedTempo, setSelectedTempo] = useState(DEFAULT_TEMPO);
  const [selectedNumberOfNotes, setSelectedNumberOfNotes] = useState(
    DEFAULT_NUMBER_OF_NOTES
  );
  const [notesForKeyAndScale, setNotesForKeyAndScale] = useState([]);
  const [randomNotes, setRandomNotes] = useState([]);
  const [selectedOctaveRange, setSelectedOctaveRange] =
    useState(DEFAULT_OCTAVE_RANGE);

  useEffect(() => {
    const FLAT_TO_SHARP = {
      Cb: "B",
      Db: "C#",
      Eb: "D#",
      Fb: "E",
      Gb: "F#",
      Ab: "G#",
      Bb: "A#",
    };
    const flatToSharp = (note) => {
      const { pc, oct } = Note.get(note); // pc is the pitch class (note without octave)
      return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
    };

    let notes = Mode.notes(selectedMode, selectedKey).map(
      (note) =>
        flatToSharp(Note.simplify(note)) +
        Math.floor(Math.random() * selectedOctaveRange + DEFAULT_OCTAVE)
    );

    setNotesForKeyAndScale(notes);
  }, [selectedKey, selectedMode, selectedOctaveRange]);

  useEffect(() => {
    let randomNotes = [];

    for (let i = 0; i < selectedNumberOfNotes; i++) {
      const randomIndex = Math.floor(
        Math.random() * notesForKeyAndScale.length
      );
      randomNotes.push(notesForKeyAndScale[randomIndex]);
    }

    setRandomNotes(randomNotes);
  }, [selectedKey, selectedMode, selectedNumberOfNotes, notesForKeyAndScale]);

  return (
    <div className="App">
      <div className="App-inputs">
        <Select
          id="keySelect"
          label="Select a key:"
          options={useMemo(() => {
            return mapToSelectOptions(KEYS);
          }, [])}
          onChange={setSelectedKey}
          selectedValue={selectedKey}
        />
        <Select
          id="modeSelect"
          label="Select a mode:"
          options={useMemo(() => mapToSelectOptions(modes), [modes])}
          onChange={setSelectedMode}
          selectedValue={selectedMode}
        />
        <Select
          id="numOfNotesSelect"
          label="Number of notes:"
          options={useMemo(() => {
            const notes = Array.from({ length: 16 }, (_, i) => i + 1);
            return mapToSelectOptions(notes);
          }, [])}
          onChange={setSelectedNumberOfNotes}
          selectedValue={selectedNumberOfNotes}
        />
        <Select
          id="octaveRangeSelect"
          label="Spread notes across this number of octaves:"
          options={useMemo(() => {
            const notes = Array.from({ length: 3 }, (_, i) => i + 1);
            return mapToSelectOptions(notes);
          }, [])}
          onChange={setSelectedOctaveRange}
          selectedValue={selectedOctaveRange}
        />
        <Slider
          id="tempoSlider"
          label="Tempo"
          min="10"
          max="400"
          step="10"
          value={selectedTempo}
          onChange={(e) => {
            setSelectedTempo(parseInt(e.target.value, 10));
          }}
        />
      </div>

      <Loop
        notes={randomNotes}
        // octaveRange={selectedOctaveRange}
        octaveRange={[3, 4]}
        relevantNotes={notesForKeyAndScale}
        bpm={selectedTempo}
      />

      <div id="debug">
        {selectedTempo} BPM
        <br />
        selectedNumberOfNotes: {selectedNumberOfNotes}
        <br />
        selectedKey: {selectedKey}
        <br />
        selectedScale: {selectedMode}
        <br />
        notesForKeyAndScale: {notesForKeyAndScale}
        <br />
        Random Notes:
        {randomNotes.map((note, index) => (
          <span key={index}>{note} </span>
        ))}
      </div>
    </div>
  );
}

export default App;
