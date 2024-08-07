import React from "react";
import useCurrentNoteStore from "../../store/currentNoteStore";

const CurrentNoteDisplay: React.FC = () => {
  const notes = useCurrentNoteStore((state) => state.currentNotes);
  const { removeCurrentNote } = useCurrentNoteStore();

  return (
    <div className="text-white">
      {Object.entries(notes).map(([id, note]) => (
        <p key={id}>
          {id}: {note ?? "None"} <button onClick={() => removeCurrentNote(id)}>x</button>
        </p>
      ))}
    </div>
  );
};

export default CurrentNoteDisplay;
