import React, { useEffect } from "react";
import * as Tone from "tone";

const NotePlayer = ({ note }) => {
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();

    synth.triggerAttackRelease(note, "8n");

    return () => {
      synth.dispose();
    };
  }, [note]);

  return <div>Playing note: {note}</div>;
};

export default NotePlayer;
