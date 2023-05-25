import React, { useState, useEffect, useMemo } from "react";
import { Mode, Note } from "tonal";

import {
  DEFAULT_KEY,
  DEFAULT_MODE,
  DEFAULT_TEMPO,
  DEFAULT_NUMBER_OF_NOTES,
  KEYS,
  mapToSelectOptions,
  DEFAULT_OCTAVES,
} from "./useful";
import { useLocalStorage } from "./useLocalStorage";

import Select from "./components/Select";
import Slider from "./components/Slider";
import OctaveSelector from "./components/OctaveSelector";
import ClickFirst from "./components/ClickFirst";
import Loop from "./components/Loop";
import RainbowText from "./components/RainbowText";
import SaveToMidi from "./components/SaveToMidi";

import "./App.css";
import "./Buttons.css";

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
  const [currentNote, setCurrentNote] = useState("");
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
        <div className="title">
          <RainbowText text={"Billions of Notes!"} />
          {currentNote}
        </div>
        <div className="selects">
          <Select
            id="keySelect"
            label="Key:"
            options={useMemo(() => {
              return mapToSelectOptions(KEYS);
            }, [])}
            onChange={setSelectedKey}
            selectedValue={selectedKey}
          />
          <Select
            id="modeSelect"
            label="Mode:"
            options={useMemo(() => mapToSelectOptions(modes), [modes])}
            onChange={setSelectedMode}
            selectedValue={selectedMode}
          />
          <Select
            id="numOfNotesSelect"
            label="Notes:"
            options={useMemo(() => {
              const notes = Array.from({ length: 16 }, (_, i) => i + 1);
              return mapToSelectOptions(notes);
            }, [])}
            onChange={setSelectedNumberOfNotes}
            selectedValue={selectedNumberOfNotes}
          />
        </div>

        <div className="other">
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
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setTriggerRegenerate(!triggerRegenerate);
            }}>
            New notes
          </button>

          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}>
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => {
              setSelectedKey(DEFAULT_KEY);
              setSelectedMode(DEFAULT_MODE);
              setSelectedNumberOfNotes(DEFAULT_NUMBER_OF_NOTES);
              setSelectedOctaves(DEFAULT_OCTAVES);
              setSelectedTempo(DEFAULT_TEMPO);
            }}>
            Reset inputs
          </button>
          <button
            onClick={() => {
              alert("Not implemented yet");
            }}>
            Share
          </button>
          <button
            onClick={() => {
              SaveToMidi(randomNotes, selectedTempo);
            }}>
            Save as MIDI
          </button>
        </div>
      </div>
      <div className="thanks">
        <a
          href="https://github.com/goatonabicycle/billions-of-notes"
          target="_blank"
          rel="noreferrer">
          Code here
        </a>
        <span> Sounds thanks to:</span>{" "}
        <a href="midi-sounds-react">midi-sounds-react</a>
      </div>
      <Loop
        notes={randomNotes}
        octaveRange={selectedOctaves}
        notesInMode={notesToChooseFrom}
        bpm={selectedTempo}
        isPlaying={isPlaying}
        setCurrentNote={setCurrentNote}
      />
      <ClickFirst onClick={() => {}} />
    </div>
  );
}

export default App;
