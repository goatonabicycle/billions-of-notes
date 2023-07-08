import React, { useMemo } from "react";
import "./NotesGrid.css";
import { KEYS } from "../useful";

const computeRowClasses = (props) =>
  [
    "note-row",
    props.isFillingNote && "filling-note-row",
    props.notes.includes(props.noteRow) && "chosen-note-row",
    props.allNotesInScale.includes(props.noteRow) && "note-in-scale-row",
    props.notes[props.activeIndex] === props.noteRow && "active-row",
  ]
    .filter(Boolean)
    .join(" ");

const computeNoteClasses = (props) =>
  [
    "note-cell",
    "note-label",
    props.notesInScale.includes(props.noteWithoutOctave) && "note-in-scale",
  ]
    .filter(Boolean)
    .join(" ");

const computeCellClasses = (props, note, colIndex) =>
  [
    "note-cell",
    note === props.noteRow && "note-present",
    props.activeIndex === colIndex && "active-note",
  ]
    .filter(Boolean)
    .join(" ");

const NoteRow = (props) => {
  const rowClasses = computeRowClasses(props);
  const noteClasses = computeNoteClasses(props);

  return (
    <div className={rowClasses}>
      <div className={noteClasses}>{props.noteRow}</div>
      {props.notes.map((note, colIndex) => {
        const cellClasses = computeCellClasses(props, note, colIndex);

        return (
          <div
            key={`${note}-${colIndex}`}
            className={cellClasses}>
            {note === props.noteRow ? note : ""}
          </div>
        );
      })}
    </div>
  );
};

const NotesGrid = ({ octaveRange, notes, activeIndex, notesInScale }) => {
  const allPossibleNotes = useMemo(
    () =>
      octaveRange.flatMap((octave) => KEYS.map((note) => `${note}${octave}`)),
    [octaveRange]
  );

  const allNotesInScale = useMemo(
    () =>
      octaveRange.flatMap((octave) =>
        notesInScale.map((note) => `${note}${octave}`)
      ),
    [octaveRange, notesInScale]
  );

  return (
    <div className="notes-grid ">
      {allPossibleNotes.map((noteRow, rowIndex) => {
        const octave = parseInt(noteRow.slice(-1));
        const nextOctave = parseInt(allPossibleNotes[rowIndex + 1]?.slice(-1));
        const noteWithoutOctave = noteRow.slice(0, -1); // Extract note without octave
        const isSameOrNextOctave = nextOctave - octave <= 1;
        const isLastNote = rowIndex === allPossibleNotes.length - 1;

        if (isLastNote || isSameOrNextOctave) {
          return (
            <NoteRow
              key={noteRow}
              noteRow={noteRow}
              isFillingNote={false}
              notes={notes}
              allNotesInScale={allNotesInScale}
              activeIndex={activeIndex}
              notesInScale={notesInScale}
              noteWithoutOctave={noteWithoutOctave}
            />
          );
        }

        const spacerRowsCount = nextOctave - octave - 1;
        const spacerRows = Array(spacerRowsCount)
          .fill()
          .map((_, i) => (
            <NoteRow
              key={`${noteWithoutOctave}${octave + i + 1}`}
              noteRow={`${noteWithoutOctave}${octave + i + 1}`}
              isFillingNote={true}
              notes={notes}
              allNotesInScale={allNotesInScale}
              activeIndex={activeIndex}
              notesInScale={notesInScale}
              noteWithoutOctave={noteWithoutOctave}
            />
          ));

        return (
          <React.Fragment key={noteRow}>
            <NoteRow
              noteRow={noteRow}
              isFillingNote={false}
              notes={notes}
              allNotesInScale={allNotesInScale}
              activeIndex={activeIndex}
              notesInScale={notesInScale}
              noteWithoutOctave={noteWithoutOctave}
            />
            {spacerRows}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NotesGrid;
