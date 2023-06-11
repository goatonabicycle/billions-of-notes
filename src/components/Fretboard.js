// Fretboard.jsx
import React, { useState, useEffect } from "react";
import { generateFrets } from "../useful";
import GuitarString from "./GuitarString";

const Fretboard = ({ currentNote, selectedNotes, scaleNotes }) => {
  const guitarTuning = ["B1", "E2", "A2", "D3", "G3", "B3", "E4"];
  const [position, setPosition] = useState(1);

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
      if (position < minPosition + 2 || position > maxPosition - 2) {
        setPosition(minPosition + 2);
      }
    }
  }, [currentNote]);

  return (
    <div className="fretboard">
      {guitarTuning.reverse().map((baseNote, index) => (
        <GuitarString
          key={index}
          baseNote={baseNote}
          currentNote={currentNote}
          selectedNotes={selectedNotes}
          scaleNotes={scaleNotes}
          position={position}
        />
      ))}

      <div className="fret-numbers">
        {Array.from({ length: 22 }, (_, i) => i).map((_, i) => (
          <div
            key={i + 1}
            className="fret-number">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fretboard;
