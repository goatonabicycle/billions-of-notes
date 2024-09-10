import React, { useCallback } from "react";

import { useStorage } from "../../hooks/useLocalStorage";
import {
  DEFAULT_POSITION,
  DEFAULT_FINGER_RANGE,
  DEFAULT_NUMBER_OF_BASS_STRINGS,
  INITIAL_BASS_TUNING,
  DEFAULT_NUMBER_OF_BASS_FRETS,
} from "../../useful";

import Slider from "../Slider";
import Fretboard from "../Fretboard";

import "./Guitar.css";

const BassGuitar = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const [selectedPosition, setSelectedPosition] = useStorage(
    "selectedBassPosition",
    DEFAULT_POSITION
  );

  const [selectedFingerRange, setSelectedFingerRange] = useStorage(
    "selectedBassFingerRange",
    DEFAULT_FINGER_RANGE
  );

  const [selectedNumberOfBassStrings, setSelectedNumberOfBassStrings] =
    useStorage("selectedBassStrings", DEFAULT_NUMBER_OF_BASS_STRINGS);

  const [selectedBassTuning, setSelectedBassTuning] = useStorage(
    "selectedBassTuning",
    INITIAL_BASS_TUNING
  );

  const [numberOfBassFrets, setNumberOfBassFrets] = useStorage(
    "numberOfBassFrets",
    DEFAULT_NUMBER_OF_BASS_FRETS
  );

  let strings = selectedBassTuning.slice(0, selectedNumberOfBassStrings);

  const handleSelectedPositionChange = useCallback(
    (e) => setSelectedPosition(parseInt(e.target.value, 10)),
    []
  );

  const handleSelectedFingerRangeChange = useCallback(
    (e) => setSelectedFingerRange(parseInt(e.target.value, 10)),
    []
  );

  const handleSelectedNumberOfBassStringsChange = useCallback(
    (e) => setSelectedNumberOfBassStrings(parseInt(e.target.value, 10)),
    []
  );

  const handleNumberOfBassFretsChange = useCallback(
    (e) => setNumberOfBassFrets(parseInt(e.target.value, 10)),
    []
  );

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
          onChange={handleSelectedPositionChange}
        />

        <Slider
          id="fingerRangeSlider"
          label="Finger Range"
          min="4"
          max="7"
          step="1"
          editable={false}
          value={selectedFingerRange}
          onChange={handleSelectedFingerRangeChange}
        />

        <Slider
          id="numberOfBassStringsSlider"
          label="Strings"
          min="4"
          max="6" // This could be 6. But bass guitars are tuned weirdly. They don't just simply get an extra low note. I'll need to support custom tunings first.
          step="1"
          editable={false}
          value={selectedNumberOfBassStrings}
          onChange={handleSelectedNumberOfBassStringsChange}
        />

        <Slider
          id="numberOfBassFretsSlider"
          label="Frets"
          min="12"
          max="24"
          step="1"
          editable={false}
          value={numberOfBassFrets}
          onChange={handleNumberOfBassFretsChange}
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
