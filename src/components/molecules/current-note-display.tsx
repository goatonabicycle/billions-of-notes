import React from "react";
import useCurrentNoteStore from "../../currentNoteStore";

const CurrentNoteDisplay: React.FC = () => {
  const currentNote = useCurrentNoteStore((state) => state.currentNote);

  return (
    <div>
      <p>Currently Playing Note: {currentNote ?? "None"}</p>
    </div>
  );
};

export default CurrentNoteDisplay;
