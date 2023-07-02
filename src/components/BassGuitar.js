import React from "react";

import { useLocalStorage } from "../useLocalStorage";
import {
  DEFAULT_POSITION,
  DEFAULT_FINGER_RANGE,
  DEFAULT_NUMBER_OF_BASS_STRINGS,
  INITIAL_BASS_TUNING,
  DEFAULT_NUMBER_OF_BASS_FRETS,
} from "../useful";

import Slider from "../components/Slider";
import Fretboard from "./Fretboard";

import "./Guitar.css";

const BassGuitar = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const [selectedPosition, setSelectedPosition] = useLocalStorage(
    "selectedBassPosition",
    DEFAULT_POSITION
  );

  const [selectedFingerRange, setSelectedFingerRange] = useLocalStorage(
    "selectedBassFingerRange",
    DEFAULT_FINGER_RANGE
  );

  const [selectedNumberOfBassStrings, setSelectedNumberOfBassStrings] =
    useLocalStorage("selectedBassStrings", DEFAULT_NUMBER_OF_BASS_STRINGS);

  const [selectedBassTuning, setSelectedBassTuning] = useLocalStorage(
    "selectedBassTuning",
    INITIAL_BASS_TUNING
  );

  const [numberOfBassFrets, setNumberOfBassFrets] = useLocalStorage(
    "numberOfBassFrets",
    DEFAULT_NUMBER_OF_BASS_FRETS
  );

  let strings = selectedBassTuning.slice(0, selectedNumberOfBassStrings);

  return (
    <div className="guitar-container doodle-border">
      {"Bass Guitar"}

      <div className="guitar-inputs">
        <Slider
          id="positionSlider"
          label="Play from"
          min="0"
          max={numberOfBassFrets}
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
          id="numberOfBassStringsSlider"
          label="Number of Strings"
          min="4"
          max="6" // This could be 6. But bass guitars are tuned weirdly. They don't just simply get an extra low note. I'll need to support custom tunings first.
          step="1"
          editable={false}
          value={selectedNumberOfBassStrings}
          onChange={(e) => {
            setSelectedNumberOfBassStrings(parseInt(e.target.value, 10));
          }}
        />

        <Slider
          id="numberOfBassFretsSlider"
          label="Number of Frets"
          min="12"
          max="24"
          step="1"
          editable={false}
          value={numberOfBassFrets}
          onChange={(e) => {
            setNumberOfBassFrets(parseInt(e.target.value, 10));
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
        selectedTuning={selectedBassTuning}
        setSelectedTuning={setSelectedBassTuning}
        initialTuning={INITIAL_BASS_TUNING}
        numberOfFrets={numberOfBassFrets}
      />
    </div>
  );
};

export default BassGuitar;
