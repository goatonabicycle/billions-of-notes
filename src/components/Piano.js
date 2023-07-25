import React from "react";

import { Piano as ReactPiano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import "./Piano.css";

const Piano = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const currentNote = notesToPlay[playbackIndex];

  let activeNote;
  if (currentNote) {
    activeNote = MidiNumbers.fromNote(currentNote);
  }

  return (
    <div className="doodle-border">
      {"Piano"}
      <div className="piano-container">
        <ReactPiano
          noteRange={{
            first: MidiNumbers.fromNote("c1"),
            last: MidiNumbers.fromNote("c6"),
          }}
          playNote={() => {}}
          stopNote={() => {}}
          activeNotes={[activeNote]}
        />
      </div>
    </div>
  );
};

export default Piano;
