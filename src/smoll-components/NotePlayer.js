import React from "react";
import useNotePlayer from "./hooks/useNotePlayer.js";

const NotePlayer = ({ notes, tempo, instrumentType, setCurrentNote }) => {
  useNotePlayer(notes, tempo, instrumentType, 0.5, 0.5, setCurrentNote);

  return (
    <div>
      Playing notes at {tempo} BPM with {instrumentType}
    </div>
  );
};

export default NotePlayer;
