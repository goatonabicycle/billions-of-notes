import React, { useEffect } from "react";
import MIDISounds from "midi-sounds-react";

import { KEYS } from "../useful";

const NotePlayer = ({ note }) => {
  const midiSoundsRef = React.createRef();

  useEffect(() => {
    const keyNumber = note.slice(0, -1);
    const octave = note.slice(-1);

    let midiNumber = KEYS.indexOf(keyNumber);
    if (midiNumber === -1) {
      console.error("Invalid note:", note);
      return;
    }

    midiNumber += octave * 12;
    midiSoundsRef.current.playChordNow(272, [midiNumber], 1.0);
  }, [note, midiSoundsRef]);

  return (
    <MIDISounds
      ref={midiSoundsRef}
      appElementName="root"
    />
  );
};

export default NotePlayer;
