import React, { useState, useEffect, useMemo } from "react";
import { Mode, Note } from "tonal";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DEFAULT_KEY,
  DEFAULT_MODE,
  DEFAULT_TEMPO,
  DEFAULT_NUMBER_OF_NOTES,
  KEYS,
  mapToSelectOptions,
  DEFAULT_OCTAVES,
  FLAT_TO_SHARP,
} from "./useful";
import { useLocalStorage } from "./useLocalStorage";

import Select from "./components/Select";
import Slider from "./components/Slider";
import OctaveSelector from "./components/OctaveSelector";
import ClickFirst from "./components/ClickFirst";
import Loop from "./components/Loop";
import RainbowText from "./components/RainbowText";
import SaveToMidi from "./components/SaveToMidi";
import LineRenderer from "./components/LineRenderer";
import MessageBox from "./components/MessageBox";

import "./App.css";
import "./Buttons.css";
import "./Doodle/doodle.css";

function App() {
  const modes = Mode.names();
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
  const [notesInMode, setNotesInMode] = useState([]);
  const [shareButtonText, setShareButtonText] = useState("Share these notes");
  const [randomNotes, setRandomNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [selectedOctaves, setSelectedOctaves] = useLocalStorage(
    "selectedOctaves",
    DEFAULT_OCTAVES
  );
  const [triggerRegenerate, setTriggerRegenerate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedFromUrl, setLoadedFromUrl] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loadedFromUrl) {
      setLoadedFromUrl(false);
      navigate(".", { replace: true });
      return;
    }

    const flatToSharp = (note) => {
      const { pc, oct } = Note.get(note);
      return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
    };

    let notesInMode = Mode.notes(selectedMode, selectedKey).map((note) =>
      flatToSharp(Note.simplify(note))
    );

    setNotesInMode(notesInMode);

    let randomNotes = [];

    for (let i = 0; i < selectedNumberOfNotes; i++) {
      const randomNote =
        notesInMode[Math.floor(Math.random() * notesInMode.length)];
      const randomOctave =
        selectedOctaves[Math.floor(Math.random() * selectedOctaves.length)];
      randomNotes.push(`${randomNote}${randomOctave}`);
    }

    setRandomNotes(randomNotes);
  }, [
    selectedKey,
    selectedMode,
    selectedNumberOfNotes,
    selectedOctaves,
    triggerRegenerate,
  ]);

  const location = useLocation();

  // This useEffect is used to load the application's state from the URL.
  useEffect(() => {
    const parsedQuery = new URLSearchParams(location.search);

    const urlInputs = parsedQuery.get("inputs");
    if (urlInputs) {
      const [key, mode, number, tempo] = urlInputs.split(",");
      setSelectedKey(key || DEFAULT_KEY);
      setSelectedMode(mode || DEFAULT_MODE);
      setSelectedNumberOfNotes(number || DEFAULT_NUMBER_OF_NOTES);
      setSelectedTempo(tempo || DEFAULT_TEMPO);
    }

    const urlOctaves = parsedQuery.get("octaves");
    if (urlOctaves) {
      setSelectedOctaves(urlOctaves.split(",").map(Number));
    }

    const urlNotes = parsedQuery.get("notes");
    if (urlNotes) {
      setRandomNotes(decodeURIComponent(urlNotes).split(","));
      setLoadedFromUrl(true);
    }
  });

  return (
    <div className="App">
      <div className="App-inputs">
        <div className="title doodle-border">
          <h1>
            <RainbowText
              text={"Billions"}
              tempo={selectedTempo}
            />
            <RainbowText
              text={" of "}
              tempo={selectedTempo}
            />
            <RainbowText
              text={"Notes!"}
              tempo={selectedTempo}
            />
          </h1>
          <div className="fun-things">
            <LineRenderer
              notes={randomNotes}
              tempo={selectedTempo}
            />
          </div>
        </div>
        <div className="selects doodle-border">
          <div className="select-grid">
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
                const notes = Array.from({ length: 200 }, (_, i) => i + 1);
                return mapToSelectOptions(notes);
              }, [])}
              onChange={setSelectedNumberOfNotes}
              selectedValue={selectedNumberOfNotes}
            />
            <Slider
              id="tempoSlider"
              label="Tempo"
              min="0"
              max="1000"
              step="10"
              value={selectedTempo}
              onChange={(e) => {
                setSelectedTempo(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <OctaveSelector
            selectedOctaves={selectedOctaves}
            setSelectedOctaves={setSelectedOctaves}
          />
        </div>
        <div className="other doodle-border">
          <div className="info-block">
            <div className="doodle-border">
              Notes used: {notesInMode.join(", ")}
            </div>
            <div className="doodle-border">
              <span className="rainbow-background current-note">
                {currentNote}
              </span>
            </div>

            <MessageBox
              showWhen={selectedTempo === 0}
              message={
                "Don't make tempo go to zero! WTF ARE YOU DOING!? OMG!!!"
              }
            />
            <MessageBox
              showWhen={selectedNumberOfNotes === "1"}
              message={"Uhm... Yes. That's a note. Amazing!"}
            />
            <MessageBox
              showWhen={selectedNumberOfNotes === "69"}
              message={"Nice!"}
            />
          </div>
        </div>
        <div className="buttons doodle-border">
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              const inputs = [
                selectedKey,
                selectedMode,
                selectedNumberOfNotes,
                selectedTempo,
              ].join(",");
              url.searchParams.set("inputs", inputs);
              url.searchParams.set("octaves", selectedOctaves.join(","));
              url.searchParams.set(
                "notes",
                encodeURIComponent(randomNotes.join(","))
              );

              navigator.clipboard.writeText(url.toString());
              setShareButtonText("Link copied!");

              setTimeout(() => {
                setShareButtonText("Share these notes");
              }, 2000);
            }}>
            {shareButtonText}
          </button>
          <button
            onClick={() => {
              SaveToMidi(randomNotes, selectedTempo);
            }}>
            Save as MIDI
          </button>

          <button>
            <a
              className="rainbow-button"
              href="https://github.com/goatonabicycle/billions-of-notes"
              target="_blank"
              rel="noreferrer">
              Code here
            </a>
          </button>

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
        </div>
      </div>

      <Loop
        notes={randomNotes}
        octaveRange={selectedOctaves}
        notesInMode={notesInMode}
        bpm={selectedTempo}
        isPlaying={isPlaying}
        setCurrentNote={setCurrentNote}
      />
      <ClickFirst onClick={() => {}} />
    </div>
  );
}

export default App;
