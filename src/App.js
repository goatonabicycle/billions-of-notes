import React, { useState, useEffect, useCallback } from "react";
import { Note, Scale } from "tonal";
import MIDISounds from "midi-sounds-react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DEFAULT_KEY,
  DEFAULT_TEMPO,
  DEFAULT_NUMBER_OF_NOTES,
  KEYS,
  DEFAULT_OCTAVES,
  FLAT_TO_SHARP,
  DEFAULT_INSTRUMENT,
  DEFAULT_VOLUME,
  shuffleArray,
  DEFAULT_PANELS_TO_SHOW,
  DEFAULT_SCALE,
  DEFAULT_EMPTY_NOTES,
  DEFAULT_NOTE_LENGTH,
  randomRGBA,
} from "./useful";
import { useStorage } from "./useLocalStorage";
import { useCount } from "./useCount";

import Loop from "./components/Loop";
import SaveToMidi from "./components/SaveToMidi";
import NotesUsed from "./components/NotesUsed";
import NotesInScale from "./components/NotesInScale";
import MessageBoxes from "./components/MessageBoxes";
import ButtonBlock from "./components/ButtonBlock";
import SelectInputGrid from "./components/SelectInputGrid";
import SelectControlsGrid from "./components/SelectControlsGrid";
import TitleArea from "./components/TitleArea";
import ShowMePanels from "./components/ShowMePanels";

import "./App.css";
import "./Buttons.css";
import "./Range.css";
import "./Doodle/doodle.css";

function App() {
  const { count, incrementCount } = useCount();
  const scales = Scale.names();

  // input state is anything that ends up changing the randomNotes you got
  const [inputState, setInputState] = useStorage({
    key: DEFAULT_KEY,
    scale: DEFAULT_SCALE,
    numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
    emptyNotes: DEFAULT_EMPTY_NOTES,
    octaves: DEFAULT_OCTAVES,
  });

  const [controlState, setControlState] = useStorage({
    instrument: DEFAULT_INSTRUMENT,
    tempo: DEFAULT_TEMPO,
  });

  const handleInputChange = useCallback(
    (event) => {
      setInputState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setInputState]
  );

  const handleControlChange = useCallback(
    (event) => {
      setControlState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setControlState]
  );

  // Replace all these states to use the more general mechanism

  // const [selectedTempo, setSelectedTempo] = useStorage(
  //   "selectedTempo",
  //   DEFAULT_TEMPO
  // );

  const [selectedVolume, setSelectedVolume] = useStorage(
    "selectedVolume",
    DEFAULT_VOLUME
  );

  const [selectedPanelsToShow, setSelectedPanelsToShow] = useStorage(
    "selectedPanelsToShow",
    DEFAULT_PANELS_TO_SHOW
  );

  const [selectedNoteLength, setSelectedNoteLength] = useStorage(
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

    setInputState({
      ...inputState,
      key: DEFAULT_KEY,
      scale: DEFAULT_SCALE,
      numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
      emptyNotes: DEFAULT_EMPTY_NOTES,
      instrument: DEFAULT_INSTRUMENT,
      octaves: DEFAULT_OCTAVES,
      tempo: DEFAULT_TEMPO,
    });
  }, [setCurrentIndex, setInputState, inputState]);

  useEffect(() => {
    if (!inputState) return;

    if (loadedFromUrl) {
      setLoadedFromUrl(false);
      navigate(".", { replace: true });
      return;
    }

    const flatToSharp = (note) => {
      const { pc, oct } = Note.get(note);
      return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
    };

    const scale = Scale.get(`${inputState.key} ${inputState.scale}`);
    const notesInScale = scale.notes.map((note) =>
      flatToSharp(Note.simplify(note))
    );

    const intervals = scale.intervals;
    console.log("intervals", intervals);

    // Todo, get more interesting information about the scale here.
    setNotesInScale(notesInScale);

    let randomNotes = [];
    let totalNotes = parseInt(inputState.numberOfNotes);
    let emptyNotes = parseInt(inputState.emptyNotes);

    for (let i = 0; i < totalNotes - emptyNotes; i++) {
      const randomNote =
        notesInScale[Math.floor(Math.random() * notesInScale.length)];
      const randomOctave =
        inputState.octaves[
          Math.floor(Math.random() * inputState.octaves.length)
        ];
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
    incrementCount(inputState.numberOfNotes);

    const randomColour = randomRGBA();
    setCurrentColour(randomColour);
  }, [inputState, triggerRegenerate, loadedFromUrl, navigate]);

  useEffect(() => {
    if (!inputState) return;
    const maxEmptyNotes = Math.max(0, parseInt(inputState.numberOfNotes) - 3);
    if (parseInt(inputState.emptyNotes) > maxEmptyNotes) {
      setInputState({
        ...inputState,
        emptyNotes: maxEmptyNotes,
      });
    }
  }, [inputState, setInputState]);

  const location = useLocation();

  // This useEffect is used to load the application's state from the URL.
  useEffect(() => {
    const parsedQuery = new URLSearchParams(location.search);

    const urlInputs = parsedQuery.get("inputs");
    if (urlInputs) {
      const [urlKey, urlScale, urlNumberOfNotes, urlTempo, urlInstrument] =
        urlInputs.split(",");

      setInputState({
        ...inputState,
        key: urlKey || DEFAULT_KEY,
        scale: urlScale || DEFAULT_SCALE,
        numberOfNotes: urlNumberOfNotes || DEFAULT_NUMBER_OF_NOTES,
        emptyNotes: DEFAULT_EMPTY_NOTES,
        // instrument: urlInstrument || DEFAULT_INSTRUMENT,
        // tempo: urlTempo || DEFAULT_TEMPO,
      });
    }

    const urlOctaves = parsedQuery.get("octaves");
    if (urlOctaves) {
      setInputState({
        ...inputState,
        octaves: urlOctaves.split(",").map(Number),
      });
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
          SaveToMidi(randomNotes, controlState.tempo);
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

  if (!inputState) return;
  if (!inputState.octaves) return;

  return (
    <div className="App">
      <button
        className="rainbow-button hide-inputs-button"
        onClick={() => setIsInputHidden(!isInputHidden)}>
        {isInputHidden ? "Show Inputs" : "Hide Inputs"}
      </button>
      <div className={`App-inputs ${isInputHidden ? "hidden" : ""}`}>
        <div className="title doodle-border">
          <TitleArea
            selectedTempo={controlState.tempo}
            setTriggerRegenerate={setTriggerRegenerate}
            triggerRegenerate={triggerRegenerate}
            currentColour={currentColour}
            randomNotes={randomNotes}
            currentIndex={currentIndex}
            count={count}
          />
        </div>

        <div className="selects">
          <SelectInputGrid
            KEYS={KEYS}
            scales={scales}
            inputState={inputState}
            setInputState={setInputState}
            handleInputChange={handleInputChange}
          />

          <SelectControlsGrid
            selectedPanelsToShow={selectedPanelsToShow}
            setSelectedPanelsToShow={setSelectedPanelsToShow}
            selectedVolume={selectedVolume}
            setSelectedVolume={setSelectedVolume}
            selectedNoteLength={selectedNoteLength}
            setSelectedNoteLength={setSelectedNoteLength}
            inputState={inputState}
            handleInputChange={handleInputChange}
            controlState={controlState}
            handleControlChange={handleControlChange}
          />

          <ButtonBlock
            setTriggerRegenerate={setTriggerRegenerate}
            triggerRegenerate={triggerRegenerate}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            resetInputs={resetInputs}
            selectedKey={inputState.key}
            selectedScale={inputState.scale}
            selectedNumberOfNotes={inputState.numberOfNotes}
            selectedTempo={controlState.tempo}
            selectedInstrument={inputState.instrument}
            selectedOctaves={inputState.selectedOctaves}
            randomNotes={randomNotes}
            setShareButtonText={setShareButtonText}
            shareButtonText={shareButtonText}
            SaveToMidi={SaveToMidi}
          />

          <MessageBoxes
            selectedTempo={controlState.tempo}
            selectedNumberOfNotes={inputState.numberOfNotes}></MessageBoxes>

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
            selectedOctaves={inputState.octaves}
          />
        </div>
      </div>

      <ShowMePanels
        selectedPanelsToShow={selectedPanelsToShow}
        currentIndex={currentIndex}
        randomNotes={randomNotes}
        notesInScale={notesInScale}
        selectedOctaves={inputState.octaves}
      />

      <MIDISounds
        ref={midiSoundsRef}
        appElementName="root"
        instruments={[inputState.instrument]} // Add all the chosen instruments here once I know what I want.
      />

      <Loop
        midiSoundsRef={midiSoundsRef}
        notes={randomNotes}
        bpm={controlState.tempo}
        isPlaying={isPlaying}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        instrument={inputState.instrument}
        volume={selectedVolume / 500}
        notePlayLength={selectedNoteLength / 10}
      />

      <div className="debug-info-block">
        isPlaying: {isPlaying.toString()}
        <br />
        loadedFromUrl: {loadedFromUrl}
        <br />
        inputState: {JSON.stringify(inputState)}
        <br />
        controlState: {JSON.stringify(controlState)}
        <br />
        selectedInstrument: {inputState.instrument}
      </div>
    </div>
  );
}

export default App;
