import React from "react";
import "./GuitarString.css";
import { generateFrets } from "../useful";

const GuitarString = ({
  currentNote,
  baseNote,
  position,
  selectedNotes,
  scaleNotes,
}) => {
  const frets = generateFrets(baseNote);

  return (
    <div className="guitar-string">
      {frets.map((note, fret) => (
        <div
          key={fret}
          className={`guitar-string__note 
              ${
                currentNote === note && fret >= position && fret < position + 5
                  ? "guitar-string__note--active"
                  : ""
              }
              ${
                selectedNotes.includes(note)
                  ? "guitar-string__note--selected"
                  : ""
              }
              ${
                scaleNotes.includes(note.slice(0, -1))
                  ? "guitar-string__note--scale"
                  : ""
              }
            `}>
          {note}
        </div>
      ))}
    </div>
  );
};

export default GuitarString;
