import React, { useState, useEffect } from "react";

import { generateFrets } from "../useful";
import GuitarString from "./GuitarString";
import "./Fretboard.css";

const Fretboard = ({ currentNote, selectedNotes, scaleNotes }) => {
  const guitarTuning = ["E4", "B3", "G3", "D3", "A2", "E2", "B1"];
  const [position, setPosition] = useState(1);
  const [hoveredNote, setHoveredNote] = useState(null);

  const markFret = (fret) => {
    const specialFrets = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleDotsFrets = [12, 24];

    if (doubleDotsFrets.includes(fret)) {
      return (
        <div
          key={fret}
          className="fret-number double-dot"></div>
      );
    } else if (specialFrets.includes(fret)) {
      return (
        <div
          key={fret}
          className="fret-number single-dot"></div>
      );
    } else {
      return (
        <div
          key={fret}
          className="fret-number"></div>
      );
    }
  };

  useEffect(() => {
    let minPosition = Infinity;
    let maxPosition = -Infinity;

    guitarTuning.forEach((baseNote, index) => {
      const frets = generateFrets(baseNote);
      const fretPosition = frets.indexOf(currentNote);

      if (fretPosition !== -1) {
        minPosition = Math.min(minPosition, fretPosition);
        maxPosition = Math.max(maxPosition, fretPosition);
      }
    });

    if (maxPosition !== -Infinity && minPosition !== Infinity) {
      const limitingRange = 2;
      if (
        position < minPosition + limitingRange ||
        position > maxPosition - limitingRange
      ) {
        setPosition(minPosition + limitingRange);
      }
    }
  }, [currentNote]);

  return (
    <div className="fretboard">
      <div className="fret-numbers">
        {Array.from({ length: 25 }, (_, i) => i).map((_, i) => markFret(i))}
      </div>
      {guitarTuning.map((baseNote, index) => (
        <GuitarString
          key={index}
          baseNote={baseNote}
          currentNote={currentNote}
          selectedNotes={selectedNotes}
          scaleNotes={scaleNotes}
          position={position}
          hoveredNote={hoveredNote}
          setHoveredNote={setHoveredNote}
        />
      ))}
      <div className="fret-numbers">
        {Array.from({ length: 25 }, (_, i) => i).map((_, i) => (
          <div
            key={i}
            className="fret-number">
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fretboard;
