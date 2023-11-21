import React, { useRef, useEffect, useState } from "react";
import { Piano as ReactPiano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Piano.css";

const Piano = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const renderNoteLabel = ({ midiNumber }) => {
    const { note, octave } = MidiNumbers.getAttributes(midiNumber);
    const noteLabel = note + octave;

    // Fixes a weird annoying response making the octave add an extra number.
    const correctNoteLabel =
      noteLabel.length > 3
        ? noteLabel.substring(0, 3)
        : noteLabel.substring(0, 2);

    return (
      <div
        style={{
          textAlign: "center",
          pointerEvents: "none",
          width: "100%",
          marginTop: "10px",
          color: "black",
          fontSize: "0.75rem",
          lineHeight: "20px",
        }}>
        {correctNoteLabel}
      </div>
    );
  };

  const noteRange = {
    first: MidiNumbers.fromNote("c1"),
    last: MidiNumbers.fromNote("c6"),
  };

  const currentNote = notesToPlay[playbackIndex];
  let activeNote;
  if (currentNote) {
    activeNote = MidiNumbers.fromNote(currentNote);
  }

  return (
    <div className="doodle-border">
      <div className="piano-container">
        <ReactPiano
          noteRange={noteRange}
          playNote={() => {}}
          stopNote={() => {}}
          activeNotes={[activeNote]}
          renderNoteLabel={renderNoteLabel}
        />
      </div>
    </div>
  );
};

export default Piano;
