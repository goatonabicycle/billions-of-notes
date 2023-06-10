import React from "react";

//import "./OctaveSelector.css";

const NotesUsed = ({ notesUsed }) => {
  return (
    <div className="notes-used">
      {notesUsed.map((note, index) => (
        <div className="flex">
          <div className="index">{index + 1}</div>
          {note}
        </div>
      ))}
    </div>
  );
};

export default NotesUsed;
