import React from "react";
import "./GuitarString.css";
import { generateFrets } from "../useful";

const GuitarString = ({
  currentNote,
  baseNote,
  position,
  selectedNotes,
  scaleNotes,
  hoveredNote,
  setHoveredNote,
}) => {
  const frets = generateFrets(baseNote);

  const hoveredBaseNote = hoveredNote ? hoveredNote.slice(0, -1) : null;

  return (
    <div className="guitar-string">
      {frets.map((note, fret) => {
        const noteBase = note.slice(0, -1);

        return (
          <div
            key={fret}
            className={`guitar-string__note 
              ${fret === 0 ? "guitar-string__note--first" : ""}
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
              ${
                hoveredNote === note
                  ? "guitar-string__note--highlight-same"
                  : ""
              }
              ${
                hoveredBaseNote === noteBase
                  ? "guitar-string__note--highlight-contains"
                  : ""
              }
            `}
            onMouseOver={() => setHoveredNote(note)}
            onMouseOut={() => setHoveredNote(null)}>
            {note}
          </div>
        );
      })}
    </div>
  );
};

export default GuitarString;
