import React, { useEffect, useState } from "react";

import { useLocalStorage } from "../useLocalStorage";
import {
  DEFAULT_POSITION,
  DEFAULT_FINGER_RANGE,
  DEFAULT_NUMBER_OF_BASS_STRINGS,
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

  let strings = [
    { note: "G", octave: 2 },
    { note: "D", octave: 2 },
    { note: "A", octave: 1 },
    { note: "E", octave: 1 },
    { note: "B", octave: 0 },
  ];

  strings = strings.slice(0, selectedNumberOfBassStrings);

  return (
    <div className="guitar-container doodle-border">
      {"Bass Guitar"}

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
          id="numberOfBassStringsSlider"
          label="Number of Strings"
          min="4"
          max="5" // This could be 6. But bass guitars are tuned weirdly. They don't just simply get an extra low note. I'll need to support custom tunings first.
          step="1"
          editable={false}
          value={selectedNumberOfBassStrings}
          onChange={(e) => {
            setSelectedNumberOfBassStrings(parseInt(e.target.value, 10));
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
      />
    </div>
  );
};

export default BassGuitar;
