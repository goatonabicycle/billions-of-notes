import React, { useEffect } from "react";
import MIDISounds from "midi-sounds-react";

const NotePlayer = ({ note }) => {
  const midiSoundsRef = React.createRef();

  useEffect(() => {
    // Map note letters to MIDI note numbers
    const notes = [
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
    const keyNumber = note.slice(0, -1);
    const octave = note.slice(-1);

    let midiNumber = notes.indexOf(keyNumber);
    if (midiNumber === -1) {
      console.error("Invalid note:", note);
      return;
    }

    midiNumber += octave * 12;
    midiSoundsRef.current.playChordNow(29, [midiNumber], 2.5); // 3 is for piano, 2.5 is the duration
  }, [note, midiSoundsRef]);

  return (
    <MIDISounds
      ref={midiSoundsRef}
      appElementName="root"
      instruments={[6]}
    />
  );
};

export default NotePlayer;
