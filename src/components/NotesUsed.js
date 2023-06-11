import React from "react";

const NotesUsed = ({ notesUsed }) => {
  return (
    <div className="notes-used">
      {notesUsed.map((note) => (
        <span>{note} </span>
      ))}
    </div>
  );
};

export default NotesUsed;
