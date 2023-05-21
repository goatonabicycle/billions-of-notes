import React from "react";
import { Note } from "tonal";

const NotesGrid = ({ notes, relevantNotes, activeIndex, octaveRange }) => {
  const POSSIBLE_NOTES = [];

  for (let octave = octaveRange[0]; octave <= octaveRange[1]; octave++) {
    for (let noteIndex = 0; noteIndex < 12; noteIndex++) {
      const note = Note.fromMidiSharps(noteIndex + 12 * octave);
      POSSIBLE_NOTES.push(note);
    }
  }

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
