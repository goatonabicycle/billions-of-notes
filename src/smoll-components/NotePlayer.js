import React from "react";
import useNotePlayer from "./hooks/useNotePlayer";

const NotePlayer = ({ notes, tempo }) => {
  useNotePlayer(notes, tempo);

  return <div>Playing notes at {tempo} BPM</div>;
};

export default NotePlayer;
