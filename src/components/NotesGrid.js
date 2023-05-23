import React from "react";
import "./NotesGrid.css";

const NotesGrid = ({ octaveRange, notes, activeIndex, notesInMode }) => {
  const notesInOctave = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const allPossibleNotes = octaveRange.flatMap((octave) =>
    notesInOctave.map((note) => `${note}${octave}`)
  );

  return (
    <div className="notes-grid">
      {allPossibleNotes.map((noteRow, rowIndex) => (
        <div
          key={noteRow}
          className={`note-row ${
            notes.includes(noteRow) ? "chosen-note-row" : ""
          } ${
            notesInMode.some((note) => noteRow.startsWith(note))
              ? "note-in-mode-row"
              : ""
          } ${notes[activeIndex] === noteRow ? "active-row" : ""}`}>
          <div className="note-cell note-label">{noteRow}</div>
          {notes.map((note, colIndex) => (
            <div
              key={`${note}-${colIndex}`}
              className={`note-cell ${note === noteRow ? "note-present" : ""} ${
                activeIndex === colIndex ? "active-note" : ""
              }`}>
              {note === noteRow ? note : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
