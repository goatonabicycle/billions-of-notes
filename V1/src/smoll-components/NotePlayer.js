import React from "react";
import useNotePlayer from "./hooks/useNotePlayer.js";

const NotePlayer = ({
  notes,
  tempo,
  instrumentType,
  volume,
  setCurrentNote,
}) => {
  useNotePlayer(notes, tempo, instrumentType, volume, 0.5, setCurrentNote);

  return (
    <div>
      Playing notes at {tempo} BPM with {instrumentType}
    </div>
  );
};

export default NotePlayer;
