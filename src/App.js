import React, { useState, useEffect, useMemo } from "react";
import { Scale, Mode, Note } from "tonal";
import {
  DEFAULT_KEY,
  DEFAULT_SCALE,
  DEFAULT_TEMPO,
  DEFAULT_NUMBER_OF_NOTES,
  DEFAULT_OCTAVE,
  KEYS,
  mapToSelectOptions,
} from "./useful";

import Select from "./components/Select";
import Slider from "./components/Slider";

import Loop from "./components/Loop";
import "./App.css";

function App() {
  const scales = Mode.names(); // Todo: rename "scales" to "modes"
  const [selectedKey, setSelectedKey] = useState(DEFAULT_KEY);
  const [selectedScale, setSelectedScale] = useState(DEFAULT_SCALE);
  const [selectedTempo, setSelectedTempo] = useState(DEFAULT_TEMPO);
  const [selectedNumberOfNotes, setSelectedNumberOfNotes] = useState(
    DEFAULT_NUMBER_OF_NOTES
  );
  const [notesForKeyAndScale, setNotesForKeyAndScale] = useState([]);
  const [randomNotes, setRandomNotes] = useState([]);

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

    let notes = Mode.notes(selectedScale, selectedKey).map(
      (note) => flatToSharp(Note.simplify(note)) + DEFAULT_OCTAVE
    );

    setNotesForKeyAndScale(notes);
  }, [selectedKey, selectedScale]);

  useEffect(() => {
    let randomNotes = [];

    for (let i = 0; i < selectedNumberOfNotes; i++) {
      const randomIndex = Math.floor(
        Math.random() * notesForKeyAndScale.length
      );
      randomNotes.push(notesForKeyAndScale[randomIndex]);
    }

    setRandomNotes(randomNotes);
  }, [selectedKey, selectedScale, selectedNumberOfNotes, notesForKeyAndScale]);

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
          id="scaleSelect"
          label="Select a scale:"
          options={useMemo(() => mapToSelectOptions(scales), [scales])}
          onChange={setSelectedScale}
          selectedValue={selectedScale}
        />
        <Select
          id="numOfNotesSelect"
          label="Number of notes:"
          options={useMemo(() => {
            const notes = Array.from({ length: 20 }, (_, i) => i);
            return mapToSelectOptions(notes);
          }, [])}
          onChange={setSelectedNumberOfNotes}
          selectedValue={selectedNumberOfNotes}
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
        selectedScale: {selectedScale}
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
