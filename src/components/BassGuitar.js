import React, { useEffect, useState } from "react";

import { useLocalStorage } from "../useLocalStorage";
import { DEFAULT_POSITION, DEFAULT_FINGER_RANGE } from "../useful";
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

  const strings = [
    { note: "G", octave: 2 },
    { note: "D", octave: 2 },
    { note: "A", octave: 1 },
    { note: "E", octave: 1 },
  ];

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
