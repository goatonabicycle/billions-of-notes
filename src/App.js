import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Note, Scale } from "tonal";
import MIDISounds from "midi-sounds-react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DEFAULT_KEY,
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
  DEFAULT_SCALE,
  DEFAULT_EMPTY_NOTES,
  DEFAULT_NOTE_LENGTH,
  randomRGBA,
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
import NotesInScale from "./components/NotesInScale";
import NotesGrid from "./components/NotesGrid";
import Guitar from "./components/Guitar";
import BassGuitar from "./components/BassGuitar";
import ShowMeSelector from "./components/ShowMeSelector";

import {
  ShareIcon,
  SaveIcon,
  NewNotesIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "./components/Icons";

import "./App.css";
import "./Buttons.css";
import "./Range.css";
import "./Doodle/doodle.css";
import ExplainButton from "./components/ExplainButton";

function App() {
  const { count, incrementCount } = useCount();
  const scales = Scale.names();

  const [selectedKey, setSelectedKey] = useLocalStorage(
    "selectedKey",
    DEFAULT_KEY
  );

  const [selectedScale, setSelectedScale] = useLocalStorage(
    "selectedScale",
    DEFAULT_SCALE
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
    DEFAULT_EMPTY_NOTES
  );

  const [selectedNoteLength, setSelectedNoteLength] = useLocalStorage(
    "selectedNoteLength",
    DEFAULT_NOTE_LENGTH
  );

  const [currentColour, setCurrentColour] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesInScale, setNotesInScale] = useState([]);
  const [shareButtonText, setShareButtonText] = useState("Share these notes");
  const [randomNotes, setRandomNotes] = useState([]);
  const [triggerRegenerate, setTriggerRegenerate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedFromUrl, setLoadedFromUrl] = useState(false);
  const [isInputHidden, setIsInputHidden] = useState(false);
  const navigate = useNavigate();
  const midiSoundsRef = React.createRef();

  const resetInputs = useCallback(() => {
    setCurrentIndex(0);
    setSelectedKey(DEFAULT_KEY);
    setSelectedScale(DEFAULT_SCALE);
    setSelectedNumberOfNotes(DEFAULT_NUMBER_OF_NOTES);
    setSelectedOctaves(DEFAULT_OCTAVES);
    setSelectedTempo(DEFAULT_TEMPO);
    setSelectedEmptyNotes(DEFAULT_EMPTY_NOTES);
    setSelectedInstrument(DEFAULT_INSTRUMENT);
  }, [
    setCurrentIndex,
    setSelectedKey,
    setSelectedScale,
    setSelectedNumberOfNotes,
    setSelectedOctaves,
    setSelectedTempo,
    setSelectedInstrument,
    setSelectedEmptyNotes,
  ]);

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

    let notesInScale = Scale.get(`${selectedKey} ${selectedScale}`).notes.map(
      (note) => flatToSharp(Note.simplify(note))
    );

    // Todo, get more interesting information about the scale here.
    setNotesInScale(notesInScale);

    let randomNotes = [];
    let totalNotes = parseInt(selectedNumberOfNotes);
    let emptyNotes = parseInt(selectedEmptyNotes);

    for (let i = 0; i < totalNotes - emptyNotes; i++) {
      const randomNote =
        notesInScale[Math.floor(Math.random() * notesInScale.length)];
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

    const randomColour = randomRGBA();
    console.log("setting the current colour to ", randomColour);
    setCurrentColour(randomColour);
  }, [
    selectedKey,
    selectedScale,
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
      const [key, scale, number, tempo, instrument] = urlInputs.split(",");
      setSelectedKey(key || DEFAULT_KEY);
      setSelectedScale(scale || DEFAULT_SCALE);
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
  }, [location.search]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key.toLowerCase()) {
        case "p": // P for play/pause. Space is important for accessibility of the page.
          event.preventDefault();
          setIsPlaying((prevIsPlaying) => !prevIsPlaying);
          break;
        case "n": // N for new notes
          setTriggerRegenerate((prevTrigger) => !prevTrigger);
          break;
        case "r": // R for reset inputs
          resetInputs();
          break;
        case "s": // S for save as MIDI
          SaveToMidi(randomNotes, selectedTempo);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const getInstruments = () => {
    return INSTRUMENTS;
  };

  return (
    <div className="App">
      <button
        className="rainbow-button hide-inputs-button"
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
              colour={currentColour}
              notes={randomNotes}
              tempo={selectedTempo}
              activeNote={currentIndex}
            />
            <Counter count={count} />

            <div className="tiny-links">
              <a
                href="https://github.com/goatonabicycle/billions-of-notes"
                target="_blank"
                className="source-code"
                rel="noreferrer">
                Source code
              </a>
              {"|"}
              <ExplainButton />
              {"|"}
              <KofiButton />

              {"|"}
              <button
                className="link-looking-button"
                onClick={() => {
                  document.body.classList.toggle("light-mode");
                }}>
                Toggle theme
              </button>
            </div>
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
              id="ScaleSelect"
              label="Scale:"
              options={useMemo(() => mapToSelectOptions(scales), [scales])}
              onChange={setSelectedScale}
              selectedValue={selectedScale}
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

            <Slider
              id="noteLengthSlider"
              label="Note Length"
              min="1"
              max="10"
              step="1"
              editable={false}
              value={selectedNoteLength}
              onChange={(e) => {
                setSelectedNoteLength(parseInt(e.target.value, 10));
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
              onClick={resetInputs}
              icon={ResetIcon}
              text="Reset inputs"
            />

            <IconButton
              onClick={() => {
                const url = new URL(window.location.href);
                const inputs = [
                  selectedKey,
                  selectedScale,
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

          <NotesInScale
            notesInScale={notesInScale}
            randomNotes={randomNotes}
            currentIndex={currentIndex}
          />

          <NotesUsed
            notesInScale={notesInScale}
            randomNotes={randomNotes}
            setRandomNotes={setRandomNotes}
            currentIndex={currentIndex}
            selectedOctaves={selectedOctaves}
          />
        </div>
      </div>

      <div className="show-me-panels">
        {selectedPanelsToShow.includes("Guitar") && (
          <Guitar
            playbackIndex={currentIndex}
            notesToPlay={randomNotes}
            scaleNotes={notesInScale}
          />
        )}
        {selectedPanelsToShow.includes("Piano Roll") && (
          <div className="doodle-border center">
            <>{"Piano Roll"}</>
            <NotesGrid
              notes={randomNotes}
              notesInScale={notesInScale}
              octaveRange={selectedOctaves}
              activeIndex={currentIndex}
            />
          </div>
        )}

        {selectedPanelsToShow.includes("Piano") && (
          <div>The Piano is coming soon!</div>
        )}

        {selectedPanelsToShow.includes("Bass Guitar") && (
          <BassGuitar
            playbackIndex={currentIndex}
            notesToPlay={randomNotes}
            scaleNotes={notesInScale}
          />
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
        notePlayLength={selectedNoteLength / 10}
      />
    </div>
  );
}

export default App;
