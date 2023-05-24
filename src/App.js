import React, { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

import { Mode, Note } from "tonal";
import {
  DEFAULT_KEY,
  DEFAULT_MODE,
  DEFAULT_TEMPO,
  DEFAULT_NUMBER_OF_NOTES,
  KEYS,
  mapToSelectOptions,
} from "./useful";

import Select from "./components/Select";
import Slider from "./components/Slider";
import OctaveSelector from "./components/OctaveSelector";
import RegenerateButton from "./components/RegenerateButton";
import ClickFirst from "./components/ClickFirst";

import Loop from "./components/Loop";
import "./App.css";

function App() {
  const modes = Mode.names(); // Todo: rename "scales" to "modes"
  const [selectedKey, setSelectedKey] = useLocalStorage(
    "selectedKey",
    DEFAULT_KEY
  );
  const [selectedMode, setSelectedMode] = useLocalStorage(
    "selectedMode",
    DEFAULT_MODE
  );
  const [selectedTempo, setSelectedTempo] = useLocalStorage(
    "selectedTempo",
    DEFAULT_TEMPO
  );
  const [selectedNumberOfNotes, setSelectedNumberOfNotes] = useLocalStorage(
    "selectedNumberOfNotes",
    DEFAULT_NUMBER_OF_NOTES
  );
  const [notesToChooseFrom, setNotesToChooseFrom] = useState([]);
  const [randomNotes, setRandomNotes] = useState([]);
  const [selectedOctaves, setSelectedOctaves] = useLocalStorage(
    "selectedOctaves",
    [3]
  );

  const [triggerRegenerate, setTriggerRegenerate] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);

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
        selectedOctaves[Math.floor(Math.random() * selectedOctaves.length)]
    );

    setNotesToChooseFrom(notes);
  }, [selectedKey, selectedMode, selectedOctaves, triggerRegenerate]);

  useEffect(() => {
    let randomNotes = [];

    for (let i = 0; i < selectedNumberOfNotes; i++) {
      const randomIndex = Math.floor(Math.random() * notesToChooseFrom.length);
      randomNotes.push(notesToChooseFrom[randomIndex]);
    }

    setRandomNotes(randomNotes);
  }, [
    selectedKey,
    selectedMode,
    selectedNumberOfNotes,
    notesToChooseFrom,
    selectedOctaves,
    triggerRegenerate,
  ]);

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

        <OctaveSelector
          selectedOctaves={selectedOctaves}
          setSelectedOctaves={setSelectedOctaves}
        />

        <RegenerateButton
          onClick={() => {
            setTriggerRegenerate(!triggerRegenerate);
          }}></RegenerateButton>

        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={() => {
            alert("Not implemented yet");
          }}>
          Reset inputs
        </button>
      </div>

      <Loop
        notes={randomNotes}
        octaveRange={selectedOctaves}
        notesInMode={notesToChooseFrom}
        bpm={selectedTempo}
        isPlaying={isPlaying}
      />
      <ClickFirst onClick={() => {}} />
    </div>
  );
}

export default App;
