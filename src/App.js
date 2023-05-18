import React, { useState, useEffect, useMemo } from "react";
import { Scale, Mode } from "tonal";

import Select from "./components/Select";
import "./App.css";

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
  const [notesForKeyAndScale, setNotesForKeyAndScale] = useState([]);
  const [randomNotes, setRandomNotes] = useState([]);
  const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);

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

  useEffect(() => {
    const defaultOctave = "4";
    const notes = Scale.get(`${selectedKey} ${selectedScale}`).notes.map(
      (note) => note + defaultOctave
    );
    setNotesForKeyAndScale(notes);
  }, [selectedKey, selectedScale]);

  const numberOfNotesOptions = useMemo(() => {
    const notes = Array.from({ length: 29 }, (_, i) => i + 4);
    return mapToSelectOptions(notes);
  }, []);

  const handleTempoChange = (e) => {
    setSelectedTempo(parseInt(e.target.value, 10));
  };

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
      <br />
      Random notes based on above number of notes:
      <div>
        <h1>Random Notes:</h1>
        {randomNotes.map((note, index) => (
          <span key={index}>{note} </span>
        ))}
      </div>
    </div>
  );
}

export default App;
