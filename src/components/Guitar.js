import React, { useEffect, useState } from "react";

import { useLocalStorage } from "../useLocalStorage";
import {
  DEFAULT_POSITION,
  DEFAULT_FINGER_RANGE,
  DEFAULT_NUMBER_OF_GUITAR_STRINGS,
} from "../useful";

import Slider from "../components/Slider";
import Fretboard from "./Fretboard";

import "./Guitar.css";

const Guitar = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const [selectedPosition, setSelectedPosition] = useLocalStorage(
    "selectedPosition",
    DEFAULT_POSITION
  );

  const [selectedFingerRange, setSelectedFingerRange] = useLocalStorage(
    "selectedFingerRange",
    DEFAULT_FINGER_RANGE
  );

  const [selectedNumberOfGuitarStrings, setSelectedNumberOfGuitarStrings] =
    useLocalStorage("selectedGuitarStrings", DEFAULT_NUMBER_OF_GUITAR_STRINGS);

  const [selectedTuning, setSelectedTuning] = useLocalStorage(
    "selectedTuning",
    [
      { note: "E", octave: 4 },
      { note: "B", octave: 3 },
      { note: "G", octave: 3 },
      { note: "D", octave: 3 },
      { note: "A", octave: 2 },
      { note: "E", octave: 2 },
      { note: "B", octave: 1 },
      { note: "F#", octave: 1 },
    ]
  );

  let strings = selectedTuning.slice(0, selectedNumberOfGuitarStrings);

  return (
    <div className="guitar-container doodle-border">
      {"Guitar"}

      <div className="guitar-inputs">
        <Slider
          id="positionSlider"
          label="Preferred position"
          min="0"
          max="24"
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
          label="Number of Strings"
          min="6"
          max="8"
          step="1"
          editable={false}
          value={selectedNumberOfGuitarStrings}
          onChange={(e) => {
            setSelectedNumberOfGuitarStrings(parseInt(e.target.value, 10));
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
      />
    </div>
  );
};

export default Guitar;
