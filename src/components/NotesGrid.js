import React from "react";
import "./NotesGrid.css";
import { KEYS } from "../useful";

const NotesGrid = ({ octaveRange, notes, activeIndex, notesInMode }) => {
  const allPossibleNotes = octaveRange.flatMap((octave) =>
    KEYS.map((note) => `${note}${octave}`)
  );

  const allNotesInMode = octaveRange.flatMap((octave) =>
    notesInMode.map((note) => `${note}${octave}`)
  );

  return (
    <div className="notes-grid">
      {allPossibleNotes.map((noteRow, rowIndex) => (
        <div
          key={noteRow}
          className={`note-row ${
            notes.includes(noteRow) ? "chosen-note-row" : ""
          } ${allNotesInMode.includes(noteRow) ? "note-in-mode-row" : ""} ${
            notes[activeIndex] === noteRow ? "active-row" : ""
          }`}>
          <div
            className={`note-cell note-label ${
              notesInMode.includes(noteRow.slice(0, -1)) ? "note-in-mode" : ""
            }`}>
            {noteRow}
          </div>
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
