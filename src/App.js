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
import NotesGrid from "./components/NotesGrid";
import Guitar from "./components/Guitar";
import BassGuitar from "./components/BassGuitar";
import Piano from "./components/Piano";
import MessageBoxes from "./components/MessageBoxes";
import ButtonBlock from "./components/ButtonBlock";

import SelectInputGrid from "./components/SelectInputGrid";
import SelectControlsGrid from "./components/SelectControlsGrid";

import "./App.css";
import "./Buttons.css";
import "./Range.css";
import "./Doodle/doodle.css";
import TitleArea from "./components/TitleArea";

function App() {
  const { count, incrementCount } = useCount();
  const scales = Scale.names();

  const [selectedKey, setSelectedKey] = useStorage("selectedKey", DEFAULT_KEY);

  const [selectedScale, setSelectedScale] = useStorage(
    "selectedScale",
    DEFAULT_SCALE
  );

  const [selectedTempo, setSelectedTempo] = useStorage(
    "selectedTempo",
    DEFAULT_TEMPO
  );

  const [selectedVolume, setSelectedVolume] = useStorage(
    "selectedVolume",
    DEFAULT_VOLUME
  );

  const [selectedInstrument, setSelectedInstrument] = useStorage(
    "selectedInstrument",
    DEFAULT_INSTRUMENT
  );

  const [selectedNumberOfNotes, setSelectedNumberOfNotes] = useStorage(
    "selectedNumberOfNotes",
    DEFAULT_NUMBER_OF_NOTES
  );

  const [selectedOctaves, setSelectedOctaves] = useStorage(
    "selectedOctaves",
    DEFAULT_OCTAVES
  );

  const [selectedPanelsToShow, setSelectedPanelsToShow] = useStorage(
    "selectedPanelsToShow",
    DEFAULT_PANELS_TO_SHOW
  );

  const [selectedEmptyNotes, setSelectedEmptyNotes] = useStorage(
    "selectedEmptyNotes",
    DEFAULT_EMPTY_NOTES
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

    const scale = Scale.get(`${selectedKey} ${selectedScale}`);
    const notesInScale = scale.notes.map((note) =>
      flatToSharp(Note.simplify(note))
    );

    const intervals = scale.intervals;
    console.log("intervals", intervals);

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
    setCurrentColour(randomColour);
  }, [
    selectedKey,
    selectedScale,
    selectedNumberOfNotes,
    selectedOctaves,
    triggerRegenerate,
    selectedEmptyNotes,
    loadedFromUrl,
    navigate,
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
            selectedTempo={selectedTempo}
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
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            selectedScale={selectedScale}
            setSelectedScale={setSelectedScale}
            selectedNumberOfNotes={selectedNumberOfNotes}
            setSelectedNumberOfNotes={setSelectedNumberOfNotes}
            selectedEmptyNotes={selectedEmptyNotes}
            setSelectedEmptyNotes={setSelectedEmptyNotes}
            selectedOctaves={selectedOctaves}
            setSelectedOctaves={setSelectedOctaves}
          />

          <SelectControlsGrid
            selectedPanelsToShow={selectedPanelsToShow}
            setSelectedPanelsToShow={setSelectedPanelsToShow}
            selectedTempo={selectedTempo}
            setSelectedTempo={setSelectedTempo}
            selectedVolume={selectedVolume}
            setSelectedVolume={setSelectedVolume}
            selectedNoteLength={selectedNoteLength}
            setSelectedNoteLength={setSelectedNoteLength}
            selectedInstrument={selectedInstrument}
            setSelectedInstrument={setSelectedInstrument}
          />

          <ButtonBlock
            setTriggerRegenerate={setTriggerRegenerate}
            triggerRegenerate={triggerRegenerate}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            resetInputs={resetInputs}
            selectedKey={selectedKey}
            selectedScale={selectedScale}
            selectedNumberOfNotes={selectedNumberOfNotes}
            selectedTempo={selectedTempo}
            selectedInstrument={selectedInstrument}
            selectedOctaves={selectedOctaves}
            randomNotes={randomNotes}
            setShareButtonText={setShareButtonText}
            shareButtonText={shareButtonText}
            SaveToMidi={SaveToMidi}
          />

          <MessageBoxes
            selectedTempo={selectedTempo}
            selectedNumberOfNotes={selectedNumberOfNotes}></MessageBoxes>

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
          <Piano
            playbackIndex={currentIndex}
            notesToPlay={randomNotes}
            scaleNotes={notesInScale}
          />
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

      <div className="debug-info-block">
        isPlaying: {isPlaying.toString()}
        <br />
        loadedFromUrl: {loadedFromUrl}
        <br />
        selectedKey: {selectedKey}
        <br />
        selectedScale: {selectedScale}
        <br />
        selectedNumberOfNotes: {selectedNumberOfNotes}
        <br />
        selectedEmptyNotes: {selectedEmptyNotes}
        <br />
        selectedOctaves: {selectedOctaves}
      </div>
    </div>
  );
}

export default App;
