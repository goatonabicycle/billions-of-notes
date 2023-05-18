import React from "react";
import { Note } from "tonal";

// Define the possible notes within one octave
const POSSIBLE_NOTES = Array.from({ length: 12 }, (_, i) =>
  Note.fromMidi(i + 60)
);

// The NotesGrid component
const NotesGrid = ({ notes }) => {
  const noteToGridRow = (note) => {
    const midi = Note.midi(note);
    return midi ? 12 - (midi % 12) : null;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `50px repeat(${notes.length}, 1fr)`,
        gridTemplateRows: `repeat(${POSSIBLE_NOTES.length}, 1fr)`,
      }}>
      {/* Add note labels */}
      {POSSIBLE_NOTES.map((note, i) => (
        <div
          key={i}
          style={{
            gridColumn: 1,
            gridRow: POSSIBLE_NOTES.length - i,
            backgroundColor: "lightgrey",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {note}
        </div>
      ))}
      {/* Add note blocks */}
      {notes.map((note, index) => {
        const row = noteToGridRow(note);
        return row !== null ? (
          <div
            key={index}
            style={{
              gridColumn: index + 2, // Adjust for the new column
              gridRow: row,
              backgroundColor: "skyblue",
              border: "1px solid black",
            }}>
            {note}
          </div>
        ) : null;
      })}
    </div>
  );
};

export default NotesGrid;
