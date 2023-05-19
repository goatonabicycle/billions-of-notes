import React from "react";
import { Note } from "tonal";

import { KEYS } from "../useful";

const NotesGrid = ({ notes, relevantNotes, activeIndex }) => {
  const POSSIBLE_NOTES = Array.from({ length: 12 }, (_, i) =>
    Note.fromMidiSharps(i + 48)
  );

  const noteToGridRow = (note) => {
    const midi = Note.midi(note);
    return midi ? 12 - (midi % 12) : null;
  };

  return (
    <div
      style={{
        display: "grid",
      }}>
      {POSSIBLE_NOTES.map((note, i) => (
        <div
          key={i}
          style={{
            gridColumn: 1,
            gridRow: POSSIBLE_NOTES.length - i,
            backgroundColor: relevantNotes?.includes(note)
              ? "blue"
              : "lightgrey",
            padding: "5px",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {note}
        </div>
      ))}

      {notes.map((note, index) => {
        const row = noteToGridRow(note);
        return row !== null ? (
          <div
            key={index}
            style={{
              gridColumn: index + 2,
              gridRow: row,
              padding: "5px",
              backgroundColor: index === activeIndex ? "red" : "blue",
            }}>
            {note}
          </div>
        ) : null;
      })}
    </div>
  );
};

export default NotesGrid;
