import React from "react";
import "./NotesUsed.css";

const NotesUsed = ({ randomNotes, currentIndex, setRandomNotes }) => {
  return (
    <div className="notes-used">
      {randomNotes.map((note, i) => {
        const isCurrentNote = i === currentIndex;
        return (
          <span
            key={i}
            className={isCurrentNote ? "note active" : "note"}>
            {note}
          </span>
        );
      })}
    </div>
  );
};

export default NotesUsed;
