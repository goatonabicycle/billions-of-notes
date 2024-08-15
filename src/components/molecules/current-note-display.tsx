import React from "react";
import useCurrentNoteStore from "../../store/currentNoteStore";

const CurrentNoteDisplay: React.FC = () => {
  const notes = useCurrentNoteStore((state) => state.currentNotes);

  return (
    <div className="text-white">
      {Object.entries(notes).map(([id, note]) => (
        <p key={id}>
          {id}: {note ?? "None"}
        </p>
      ))}
    </div>
  );
};

export default CurrentNoteDisplay;
