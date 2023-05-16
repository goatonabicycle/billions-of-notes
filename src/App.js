import React, { useState, useMemo } from "react";
import { Scale, Mode } from "tonal";

import Guitar from "react-guitar";
import dark from "react-guitar-theme-dark";

import Select from "./components/Select";
import "./App.css";

// https://github.com/tonaljs/tonal

const mapToSelectOptions = (items) => {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
};

function App() {
  const scales = Mode.names();
  const [selectedKey, setSelectedKey] = useState("C");
  const [selectedScale, setSelectedScale] = useState("ionian");
  const [selectedTempo, setSelectedTempo] = useState(120);
  const [selectedNumberOfNotes, setSelectedNumberOfNotes] = useState(4);

  const keyOptions = useMemo(() => {
    const keys = [
      "A",
      "Bb",
      "B",
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
    ];
    return mapToSelectOptions(keys);
  }, []);
  const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);

  const numberOfNotesOptions = useMemo(() => {
    const notes = Array.from({ length: 29 }, (_, i) => i + 4);
    return mapToSelectOptions(notes);
  }, []);

  const defaultOctave = "4";
  const notesForKeyAndScale = Scale.get(
    `${selectedKey} ${selectedScale}`
  ).notes.map((note) => note + defaultOctave);

  const handleTempoChange = (e) => {
    setSelectedTempo(parseInt(e.target.value, 10));
  };

  return (
    <div className="App">
      <Select
        id="keySelect"
        label="Select a key:"
        options={keyOptions}
        onChange={setSelectedKey}
        selectedValue={selectedKey}
      />
      <Select
        id="scaleSelect"
        label="Select a scale:"
        options={scaleOptions}
        onChange={setSelectedScale}
        selectedValue={selectedScale}
      />
      <Select
        id="numOfNotesSelect"
        label="Number of notes:"
        options={numberOfNotesOptions}
        onChange={setSelectedNumberOfNotes}
        selectedValue={selectedNumberOfNotes}
      />
      <br />
      <label htmlFor="tempoSlider">Tempo:</label>
      <input
        type="range"
        id="tempoSlider"
        min="10"
        max="400"
        step="10"
        value={selectedTempo}
        onChange={handleTempoChange}
      />
      {selectedTempo} BPM
      <br />
      selectedNumberOfNotes: {selectedNumberOfNotes}
      <br />
      selectedKey: {selectedKey}
      <br />
      selectedScale: {selectedScale}
      <br />
      notesForKeyAndScale: {notesForKeyAndScale}
      <Guitar
        theme={dark}
        center={true}
        strings={[0, 0, 0, 0, 0, 0]}
      />
    </div>
  );
}

export default App;
