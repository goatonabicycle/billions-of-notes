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
import { useCount } from "./useCount";

import Select from "./components/Select";
import Slider from "./components/Slider";
import OctaveSelector from "./components/OctaveSelector";
import ClickFirst from "./components/ClickFirst";
import Loop from "./components/Loop";
import RainbowText from "./components/RainbowText";
import SaveToMidi from "./components/SaveToMidi";
import LineRenderer from "./components/LineRenderer";
import MessageBox from "./components/MessageBox";
import Counter from "./components/Counter";
import KofiButton from "./components/KofiButton";
import IconButton from "./components/IconButton";
import NotesUsed from "./components/NotesUsed";

import {
  ShareIcon,
  SaveIcon,
  CodeIcon,
  NewNotesIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "./components/Icons";

import "./App.css";
import "./Buttons.css";
import "./Range.css";
import "./Doodle/doodle.css";
import GuitarString from "./components/GuitarString";
import Fretboard from "./components/Fretboard";

function App() {
  const { count, incrementCount } = useCount();
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
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const [isInputHidden, setIsInputHidden] = useState(false);
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
    setCurrentIndex(0);
    incrementCount(selectedNumberOfNotes);
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
      <button
        style={{ fontSize: "12px" }}
        onClick={() => setIsInputHidden(!isInputHidden)}>
        {isInputHidden ? "Show Inputs" : "Hide Inputs"}
      </button>
      <div className={`App-inputs ${isInputHidden ? "hidden" : ""}`}>
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
              onClick={() => {
                setTriggerRegenerate(!triggerRegenerate);
              }}
              notes={randomNotes}
              tempo={selectedTempo}
            />
            <Counter count={count} />
          </div>
        </div>
        <div className="tiny-info doodle-border">
          <NotesUsed notesUsed={notesInMode} />

          <div className="current-note">
            <span className="rainbow-background ">{currentNote}</span>
          </div>
        </div>
        <div className="selects ">
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
            <OctaveSelector
              selectedOctaves={selectedOctaves}
              setSelectedOctaves={setSelectedOctaves}
            />
          </div>

          <div>
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

          <div className="buttons">
            <IconButton
              icon={NewNotesIcon}
              onClick={() => {
                setTriggerRegenerate(!triggerRegenerate);
              }}
              text="New notes"
            />

            <IconButton
              text={isPlaying ? "Pause" : "Play"}
              icon={isPlaying ? PauseIcon : PlayIcon}
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            />

            <IconButton
              onClick={() => {
                setCurrentIndex(0);
                setSelectedKey(DEFAULT_KEY);
                setSelectedMode(DEFAULT_MODE);
                setSelectedNumberOfNotes(DEFAULT_NUMBER_OF_NOTES);
                setSelectedOctaves(DEFAULT_OCTAVES);
                setSelectedTempo(DEFAULT_TEMPO);
              }}
              icon={ResetIcon}
              text="Reset inputs"
            />

            <IconButton
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
              }}
              text={shareButtonText}
              icon={ShareIcon}
            />

            <IconButton
              onClick={() => {
                SaveToMidi(randomNotes, selectedTempo);
              }}
              icon={SaveIcon}
              text="Save as MIDI"
            />

            <a
              className="rainbow-button"
              href="https://github.com/goatonabicycle/billions-of-notes"
              target="_blank"
              rel="noreferrer">
              <IconButton
                icon={CodeIcon}
                text="Source code"
              />
            </a>

            <KofiButton />
          </div>
        </div>
      </div>

      <Fretboard
        currentNote={currentNote}
        selectedNotes={randomNotes}
        scaleNotes={notesInMode}
      />
      <Loop
        notes={randomNotes}
        octaveRange={selectedOctaves}
        notesInMode={notesInMode}
        bpm={selectedTempo}
        isPlaying={isPlaying}
        setCurrentNote={setCurrentNote}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <ClickFirst onClick={() => {}} />
    </div>
  );
}

export default App;
