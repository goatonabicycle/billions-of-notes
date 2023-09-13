import React from "react";

import { useStorage } from "../useLocalStorage";
import {
  DEFAULT_POSITION,
  DEFAULT_FINGER_RANGE,
  DEFAULT_NUMBER_OF_GUITAR_STRINGS,
  INITIAL_GUITAR_TUNING,
  DEFAULT_NUMBER_OF_GUITAR_FRETS,
} from "../useful";

import Slider from "../components/Slider";
import Fretboard from "./Fretboard";

import "./Guitar.css";

const Guitar = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const [selectedPosition, setSelectedPosition] = useStorage(
    "selectedPosition",
    DEFAULT_POSITION
  );

  const [selectedFingerRange, setSelectedFingerRange] = useStorage(
    "selectedFingerRange",
    DEFAULT_FINGER_RANGE
  );

  const [selectedNumberOfGuitarStrings, setSelectedNumberOfGuitarStrings] =
    useStorage("selectedGuitarStrings", DEFAULT_NUMBER_OF_GUITAR_STRINGS);

  const [numberOfGuitarFrets, setNumberOfGuitarFrets] = useStorage(
    "numberOfGuitarFrets",
    DEFAULT_NUMBER_OF_GUITAR_FRETS
  );

  const [selectedTuning, setSelectedTuning] = useStorage(
    "selectedTuning",
    INITIAL_GUITAR_TUNING
  );

  let strings = selectedTuning.slice(0, selectedNumberOfGuitarStrings);

  return (
    <div className="guitar-container doodle-border">
      {"Guitar"}

      <div className="guitar-inputs">
        <Slider
          id="positionSlider"
          label="Play from"
          min="0"
          max={numberOfGuitarFrets}
          step="1"
          editable={false}
          value={selectedPosition}
          onChange={(e) => {
            setSelectedPosition(parseInt(e.target.value, 10));
          }}
        />

        <Slider
          id="fingerRangeSlider"
          label="Finger Range"
          min="4"
          max="7"
          step="1"
          editable={false}
          value={selectedFingerRange}
          onChange={(e) => {
            setSelectedFingerRange(parseInt(e.target.value, 10));
          }}
        />

        <Slider
          id="numberOfGuitarStringsSlider"
          label="Strings"
          min="6"
          max="8"
          step="1"
          editable={false}
          value={selectedNumberOfGuitarStrings}
          onChange={(e) => {
            setSelectedNumberOfGuitarStrings(parseInt(e.target.value, 10));
          }}
        />

        <Slider
          id="numberOfGuitarFretsSlider"
          label="Frets"
          min="12"
          max="24"
          step="1"
          editable={false}
          value={numberOfGuitarFrets}
          onChange={(e) => {
            setNumberOfGuitarFrets(parseInt(e.target.value, 10));
          }}
        />
      </div>
      <Fretboard
        playbackIndex={playbackIndex}
        notesToPlay={notesToPlay}
        preferredPosition={selectedPosition}
        fingerRange={selectedFingerRange}
        scaleNotes={scaleNotes}
        strings={strings}
        selectedTuning={selectedTuning}
        setSelectedTuning={setSelectedTuning}
        initialTuning={INITIAL_GUITAR_TUNING}
        numberOfFrets={numberOfGuitarFrets}
      />
    </div>
  );
};

export default Guitar;
