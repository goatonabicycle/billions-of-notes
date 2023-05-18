import React from "react";
import { Note } from "tonal";
import NotePlayer from "./NotePlayer";

const POSSIBLE_NOTES = Array.from({ length: 12 }, (_, i) =>
  Note.fromMidi(i + 60)
);

const NotesGrid = ({ notes, relevantNotes, activeIndex }) => {
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
              border: "1px solid black",
            }}>
            {note}
            <NotePlayer noteName={note} />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default NotesGrid;
