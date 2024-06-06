import React from "react";

import "./NotesInScale.css";

const NotesInScale = ({ notesInScale }) => {
  return (
    <div className="notes-in-scale">
      Notes in this scale:
      {notesInScale.map((note, i) => {
        return (
          <div key={i}>
            <span className="note">{note || ""}</span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(NotesInScale);
