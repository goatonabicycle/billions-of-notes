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
  getRandomItem,
} from "./useful";
import { useStorage } from "./useLocalStorage";
// import { useCount } from "./useCount";

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

const scales = Scale.names();

function App() {
  // const { count, incrementCount } = useCount();

  // input state is anything that ends up changing the randomNotes you got
  const [inputState, _setInputState] = useStorage("inputState", {
    key: DEFAULT_KEY,
    scale: DEFAULT_SCALE,
    numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
    emptyNotes: DEFAULT_EMPTY_NOTES,
    octaves: DEFAULT_OCTAVES,
  });
  const setInputState = useCallback(_setInputState, []);

  const [controlState, _setControlState] = useStorage("controlState", {
    instrument: DEFAULT_INSTRUMENT,
    tempo: DEFAULT_TEMPO,
    volume: DEFAULT_VOLUME,
  });
  const setControlState = useCallback(_setControlState, []);

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

  const [selectedPanelsToShow, _setSelectedPanelsToShow] = useStorage(
    "selectedPanelsToShow",
    DEFAULT_PANELS_TO_SHOW
  );
  const setSelectedPanelsToShow = useCallback(_setSelectedPanelsToShow, []);

  const [selectedNoteLength, _setSelectedNoteLength] = useStorage(
    "selectedNoteLength",
    DEFAULT_NOTE_LENGTH
  );
  const setSelectedNoteLength = useCallback(_setSelectedNoteLength, []);

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
      octaves: DEFAULT_OCTAVES,
    });
  }, [setCurrentIndex, setInputState, inputState]);

  useEffect(() => {
    if (!inputState) return;

    if (loadedFromUrl) {
      setLoadedFromUrl(false);
      navigate(".", { replace: true });
      return;
    }

    const getRandomNotes = (notesInScale, total, empty) => {
      const notesWithOctaves = Array(total - empty)
        .fill(0)
        .map(
          () =>
            `${getRandomItem(notesInScale)}${getRandomItem(inputState.octaves)}`
        );
      const emptyNotes = Array(empty).fill("");
      return shuffleArray([...notesWithOctaves, ...emptyNotes]);
    };

    const scale = Scale.get(`${inputState.key} ${inputState.scale}`);
    const notesInScale = scale.notes.map((note) => {
      const { pc, oct } = Note.get(Note.simplify(note));
      return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
    });

    setNotesInScale(notesInScale);

    const totalNotes = parseInt(inputState.numberOfNotes);
    const emptyNotes = parseInt(inputState.emptyNotes);
    let randomNotes = getRandomNotes(notesInScale, totalNotes, emptyNotes);

    let firstNonEmptyNoteIndex = randomNotes.findIndex((note) => note !== "");
    if (firstNonEmptyNoteIndex !== -1) {
      [randomNotes[0], randomNotes[firstNonEmptyNoteIndex]] = [
        randomNotes[firstNonEmptyNoteIndex],
        randomNotes[0],
      ];
    }

    setRandomNotes(randomNotes);
    setCurrentIndex(0);
    // incrementCount(totalNotes);
    setCurrentColour(randomRGBA());
  }, [inputState, triggerRegenerate]);

  // This useEffect handles what happens when the user changes the number of notes.
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
      const [urlKey, urlScale, urlNumberOfNotes] = urlInputs.split(",");

      setInputState({
        ...inputState,
        key: urlKey || DEFAULT_KEY,
        scale: urlScale || DEFAULT_SCALE,
        numberOfNotes: urlNumberOfNotes || DEFAULT_NUMBER_OF_NOTES,
        emptyNotes: DEFAULT_EMPTY_NOTES,
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

  // This useEffect is used handle button presses.
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
            count={0}
          />
        </div>

        <div className="selects">
          <SelectInputGrid
            KEYS={KEYS}
            scales={scales}
            inputKey={inputState.key}
            inputScale={inputState.scale}
            inputNumberOfNotes={inputState.numberOfNotes}
            inputEmptyNotes={inputState.emptyNotes}
            inputOctaves={inputState.octaves}
            setInputState={setInputState}
            handleInputChange={handleInputChange}
          />

          <SelectControlsGrid
            selectedPanelsToShow={selectedPanelsToShow}
            setSelectedPanelsToShow={setSelectedPanelsToShow}
            selectedNoteLength={selectedNoteLength}
            setSelectedNoteLength={setSelectedNoteLength}
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
            selectedOctaves={inputState.octaves}
            randomNotes={randomNotes}
            setShareButtonText={setShareButtonText}
            shareButtonText={shareButtonText}
            SaveToMidi={SaveToMidi}
          />

          <MessageBoxes
            selectedTempo={controlState.tempo}
            selectedNumberOfNotes={inputState.numberOfNotes}></MessageBoxes>

          <NotesInScale notesInScale={notesInScale} />

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
      {controlState && controlState.instrument && (
        <>
          <MIDISounds
            ref={midiSoundsRef}
            appElementName="root"
            instruments={[controlState.instrument]} // Add all the chosen instruments here once I know what I want.
          />
          <Loop
            midiSoundsRef={midiSoundsRef}
            notes={randomNotes}
            bpm={controlState.tempo}
            isPlaying={isPlaying}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            instrument={controlState.instrument}
            volume={controlState.volume / 500}
            notePlayLength={selectedNoteLength / 10}
          />
        </>
      )}

      <div className="debug-info-block">
        isPlaying: {isPlaying.toString()}
        <br />
        loadedFromUrl: {loadedFromUrl}
        <br />
        inputState: {JSON.stringify(inputState)}
        <br />
        controlState: {JSON.stringify(controlState)}
      </div>
    </div>
  );
}

export default App;
