import React, { useState } from "react";
import "./NotesUsed.css";

const NotesUsed = ({
  randomNotes,
  currentIndex,
  setRandomNotes,
  notesInMode,
  selectedOctaves,
}) => {
  const [selectedNoteForEditing, setSelectedNoteForEditing] = useState(null);

  const allPossibleNotes = notesInMode.flatMap((note) =>
    selectedOctaves.map((octave) => `${note}${octave}`)
  );

  const handleNoteChange = (index, newNote) => {
    const newRandomNotes = [...randomNotes];
    newRandomNotes[index] = newNote;
    setRandomNotes(newRandomNotes);
    setSelectedNoteForEditing(null);
  };

  return (
    <div className="notes-used">
      {randomNotes.map((note, i) => {
        const isCurrentNote = i === currentIndex;
        const isEditing = i === selectedNoteForEditing;
        return (
          <div key={i}>
            <span
              className={isCurrentNote ? "note active" : "note"}
              onClick={() => setSelectedNoteForEditing(i)}>
              {note}
            </span>
            {isEditing && (
              <div>
                {allPossibleNotes.map((possibleNote, j) => (
                  <div
                    key={j}
                    onClick={() => handleNoteChange(i, possibleNote)}>
                    {possibleNote}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotesUsed;
