import React, { useState } from "react";
import useStore from "../../store";
import SynthPlayer from "./SynthPlayer";
import { StepType } from "reactronica";

interface NotePlayerProps {
  id: string;
  tempo: number;
}

const NotePlayer: React.FC<NotePlayerProps> = ({ id, tempo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { inputStates } = useStore();
  const inputState = inputStates.find((state) => state.id === id);

  const notes = (inputState?.generatedNotes ?? []).map((note) => [
    `${note.note}${note.octave ?? ""}`,
    "1n",
  ]) as StepType[];

  if (!inputState || notes.length === 0) return null;

  return (
    <div>
      <p>Playing notes for input: {id}</p>
      <button
        onClick={() => setIsPlaying(true)}
        className="mt-2 bg-blue-500 text-white px-4 py-2"
      >
        Start Playing
      </button>
      <button
        onClick={() => setIsPlaying(false)}
        className="mt-2 bg-red-500 text-white px-4 py-2"
      >
        Stop Playing
      </button>
      <SynthPlayer notes={notes} tempo={tempo} isPlaying={isPlaying} />
    </div>
  );
};

export default NotePlayer;
