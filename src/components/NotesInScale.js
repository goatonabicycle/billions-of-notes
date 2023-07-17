import React, { useState } from "react";

import "./NotesInScale.css";

const NotesInScale = ({ randomNotes, currentIndex, notesInScale }) => {
  return (
    <div className="notes-in-scale">
      {notesInScale.map((note, i) => {
        const isCurrentNote = notesInScale[i] === randomNotes[currentIndex];
        return (
          <div key={i}>
            <span className={isCurrentNote ? "note active" : "note"}>
              {note || ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default NotesInScale;
