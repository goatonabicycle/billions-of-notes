import React from "react";

const NotesUsed = ({ notesUsed }) => {
  return (
    <div className="notes-used">
      {notesUsed.map((note, i) => (
        <span key={i}>{note} </span>
      ))}
    </div>
  );
};

export default NotesUsed;
