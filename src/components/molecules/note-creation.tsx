import React from "react";
import useStore from "../../store";

interface KeySelectProps {
  id: string;
}

export const getRandomItem = (arr: Array<string>) =>
  arr[Math.floor(Math.random() * arr.length)];

const NoteCreation: React.FC<KeySelectProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  // const setInputState = useStore((state) => state.setInputState);

  const inputState = inputStates.find((state) => state.id === id);
  if (!inputState) return null;

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
    </div>
  );
};

export default NoteCreation;
