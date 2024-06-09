import React, { useEffect } from "react";
import useStore from "../../store";

interface NoteCreationProps {
  id: string;
}

const NoteCreation: React.FC<NoteCreationProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const inputState = inputStates.find((state) => state.id === id);
  const generateNotes = useStore((state) => state.generateNotes);

  useEffect(() => {
    if (
      inputState &&
      (!inputState.generatedNotes || inputState.generatedNotes.length === 0)
    ) {
      generateNotes(id);
    }
  }, [id, inputState, generateNotes]);

  if (!inputState || !inputState.generatedNotes) return null;

  return (
    <div className="w-full">
      This component will generate random notes with:
      <br />
      key: {inputState.key}
      <br />
      scale: {inputState.scale}
      <br />
      numberOfNotes: {inputState.numberOfNotes}
      <br />
      numberOfEmptyNotes: {inputState.numberOfEmptyNotes}
      <br />
      octaves: {inputState.octaves.map((octave) => octave).join(", ")}
      <div className="mt-4 flex flex-wrap gap-2">
        {inputState.generatedNotes.map((note, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center border ${
              note.note ? "bg-blue-700" : "bg-gray-200"
            }`}
          >
            {note.note ? `${note.note}${note.octave ?? ""}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteCreation;
