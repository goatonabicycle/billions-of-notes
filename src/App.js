import React, { useState, useEffect, useMemo } from "react";
import { Mode, Note } from "tonal";
import MIDISounds from "midi-sounds-react";
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
  DEFAULT_INSTRUMENT,
  mapObjectToSelectOptionsWithValues,
  INSTRUMENTS,
  DEFAULT_VOLUME,
  shuffleArray,
  DEFAULT_PANELS_TO_SHOW,
} from "./useful";
import { useLocalStorage } from "./useLocalStorage";
import { useCount } from "./useCount";

import Select from "./components/Select";
import Slider from "./components/Slider";
import OctaveSelector from "./components/OctaveSelector";
import Loop from "./components/Loop";
import RainbowText from "./components/RainbowText";
import SaveToMidi from "./components/SaveToMidi";
import LineRenderer from "./components/LineRenderer";
import MessageBox from "./components/MessageBox";
import Counter from "./components/Counter";
import KofiButton from "./components/KofiButton";
import IconButton from "./components/IconButton";
import NotesUsed from "./components/NotesUsed";
import NotesGrid from "./components/NotesGrid";
import Guitar from "./components/Guitar";
import ShowMeSelector from "./components/ShowMeSelector";

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

  const [selectedVolume, setSelectedVolume] = useLocalStorage(
    "selectedVolume",
    DEFAULT_VOLUME
  );

  const [selectedInstrument, setSelectedInstrument] = useLocalStorage(
    "selectedInstrument",
    DEFAULT_INSTRUMENT
  );
  const [selectedNumberOfNotes, setSelectedNumberOfNotes] = useLocalStorage(
    "selectedNumberOfNotes",
    DEFAULT_NUMBER_OF_NOTES
  );
  const [selectedOctaves, setSelectedOctaves] = useLocalStorage(
    "selectedOctaves",
    DEFAULT_OCTAVES
  );
  const [selectedPanelsToShow, setSelectedPanelsToShow] = useLocalStorage(
    "selectedPanelsToShow",
    DEFAULT_PANELS_TO_SHOW
  );
  const [selectedEmptyNotes, setSelectedEmptyNotes] = useLocalStorage(
    "selectedEmptyNotes",
    0
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesInMode, setNotesInMode] = useState([]);
  const [shareButtonText, setShareButtonText] = useState("Share these notes");
  const [randomNotes, setRandomNotes] = useState([]);
  const [triggerRegenerate, setTriggerRegenerate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedFromUrl, setLoadedFromUrl] = useState(false);
  const [isInputHidden, setIsInputHidden] = useState(false);
  const navigate = useNavigate();
  const midiSoundsRef = React.createRef();

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
    let totalNotes = parseInt(selectedNumberOfNotes);
    let emptyNotes = parseInt(selectedEmptyNotes);

    for (let i = 0; i < totalNotes - emptyNotes; i++) {
      const randomNote =
        notesInMode[Math.floor(Math.random() * notesInMode.length)];
      const randomOctave =
        selectedOctaves[Math.floor(Math.random() * selectedOctaves.length)];
      randomNotes.push(`${randomNote}${randomOctave}`);
    }

    for (let i = 0; i < emptyNotes; i++) {
      randomNotes.push("");
    }

    randomNotes = shuffleArray(randomNotes);

    let firstNonEmptyNoteIndex = randomNotes.findIndex((note) => note !== "");
    if (firstNonEmptyNoteIndex !== -1) {
      [randomNotes[0], randomNotes[firstNonEmptyNoteIndex]] = [
        randomNotes[firstNonEmptyNoteIndex],
        randomNotes[0],
      ];
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
    selectedEmptyNotes,
  ]);

  useEffect(() => {
    const maxEmptyNotes = Math.max(0, parseInt(selectedNumberOfNotes) - 3);
    if (parseInt(selectedEmptyNotes) > maxEmptyNotes) {
      setSelectedEmptyNotes(maxEmptyNotes);
    }
  }, [selectedNumberOfNotes, selectedEmptyNotes, setSelectedEmptyNotes]);

  const location = useLocation();

  // This useEffect is used to load the application's state from the URL.
  useEffect(() => {
    const parsedQuery = new URLSearchParams(location.search);

    const urlInputs = parsedQuery.get("inputs");
    if (urlInputs) {
      const [key, mode, number, tempo, instrument] = urlInputs.split(",");
      setSelectedKey(key || DEFAULT_KEY);
      setSelectedMode(mode || DEFAULT_MODE);
      setSelectedNumberOfNotes(number || DEFAULT_NUMBER_OF_NOTES);
      setSelectedTempo(tempo || DEFAULT_TEMPO);
      setSelectedInstrument(instrument || DEFAULT_INSTRUMENT);
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

  const getInstruments = () => {
    return INSTRUMENTS;
  };

  return (
    <div className="App">
      <button
        style={{ fontSize: "11px" }}
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
              activeNote={currentIndex}
            />
            <Counter count={count} />
          </div>
        </div>
        <div className="selects">
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
                const notes = Array.from({ length: 500 }, (_, i) => i + 1);
                return mapToSelectOptions(notes);
              }, [])}
              onChange={setSelectedNumberOfNotes}
              selectedValue={selectedNumberOfNotes}
            />

            <Select
              id="mixEmptySelect"
              label="Empty notes:"
              options={useMemo(() => {
                const maxEmptyNotes = Math.max(
                  0,
                  parseInt(selectedNumberOfNotes) - 3
                );
                const emptyNotesOptions = Array.from(
                  { length: maxEmptyNotes + 1 },
                  (_, i) => i
                );
                return mapToSelectOptions(emptyNotesOptions);
              }, [selectedNumberOfNotes])}
              onChange={setSelectedEmptyNotes}
              selectedValue={selectedEmptyNotes}
            />

            <OctaveSelector
              selectedOctaves={selectedOctaves}
              setSelectedOctaves={setSelectedOctaves}
            />
          </div>
          <div className="select-grid">
            <ShowMeSelector
              selectedPanelsToShow={selectedPanelsToShow}
              setSelectedPanelsToShow={setSelectedPanelsToShow}
            />

            <Slider
              id="tempoSlider"
              label="Tempo"
              min="0"
              max="700"
              step="5"
              editable={true}
              value={selectedTempo}
              onChange={(e) => {
                setSelectedTempo(parseInt(e.target.value, 10));
              }}
            />

            <Slider
              id="volumeSlider"
              label="Volume"
              min="0"
              max="100"
              step="1"
              editable={false}
              value={selectedVolume}
              onChange={(e) => {
                setSelectedVolume(parseInt(e.target.value, 10));
              }}
            />

            <Select
              id="instrumentSelect"
              label="Sounds:"
              options={useMemo(() => {
                return mapObjectToSelectOptionsWithValues(getInstruments());
              }, [])}
              onChange={setSelectedInstrument}
              selectedValue={selectedInstrument}
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
                setSelectedInstrument(DEFAULT_INSTRUMENT);
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
                  selectedInstrument,
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

          <div className="messages">
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
            <MessageBox
              showWhen={selectedNumberOfNotes > 200}
              message={"That... is a lot of notes!"}
            />

            <MessageBox
              showWhen={selectedTempo > "700"}
              message={"That's an insane amount of tempo!?! Can you handle it?"}
            />
          </div>

          <NotesUsed
            notesInMode={notesInMode}
            randomNotes={randomNotes}
            currentIndex={currentIndex}
          />
        </div>
      </div>

      <div className="show-me-panels">
        {selectedPanelsToShow.includes("Guitar") && (
          <Guitar
            playbackIndex={currentIndex}
            notesToPlay={randomNotes}
            scaleNotes={notesInMode}
          />
        )}
        {selectedPanelsToShow.includes("Piano Roll") && (
          <div className="doodle-border center">
            <>{"Piano Roll"}</>
            <NotesGrid
              notes={randomNotes}
              notesInMode={notesInMode}
              octaveRange={selectedOctaves}
              activeIndex={currentIndex}
            />
          </div>
        )}

        {selectedPanelsToShow.includes("Piano") && (
          <div>The Piano is coming soon!</div>
        )}

        {selectedPanelsToShow.includes("Bass Guitar") && (
          <div>The Bass Guitar is coming soon!</div>
        )}
      </div>
      <MIDISounds
        ref={midiSoundsRef}
        appElementName="root"
        instruments={[selectedInstrument]} // Add all the chosen instruments here once I know what I want.
      />
      <Loop
        midiSoundsRef={midiSoundsRef}
        notes={randomNotes}
        bpm={selectedTempo}
        isPlaying={isPlaying}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        instrument={selectedInstrument}
        volume={selectedVolume / 500}
      />
    </div>
  );
}

export default App;
