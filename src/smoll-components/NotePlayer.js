import React from "react";
import useNotePlayer from "./hooks/webAudioPlayer.js";

const NotePlayer = ({ notes, tempo, onNoteChange }) => {
  useNotePlayer(notes, tempo, "AMSynth", 0.5, 0.5, onNoteChange);

  return <div>Playing notes at {tempo} BPM</div>;
};

export default NotePlayer;
