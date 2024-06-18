import React from "react";
import useCurrentNoteStore from "../../currentNoteStore";

const CurrentNoteDisplay: React.FC = () => {
  const notes = useCurrentNoteStore((state) => state.notes);

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
