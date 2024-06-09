import React, { useMemo } from "react";
import useStore from "../../store";
import { Scale } from "tonal";

interface NoteCreationProps {
  id: string;
}

type Note = {
  note: string;
  octave: number | null;
};

const NoteCreation: React.FC<NoteCreationProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const inputState = inputStates.find((state) => state.id === id);

  const notesInKey = useMemo(() => {
    if (inputState) {
      return Scale.get(`${inputState.key} ${inputState.scale}`).notes;
    }
    return [];
  }, [inputState]);

  if (!inputState || notesInKey.length === 0) return;

  const { numberOfNotes, numberOfEmptyNotes, octaves } = inputState;
  const generatedNotes = generateRandomNotes(
    notesInKey,
    numberOfNotes,
    numberOfEmptyNotes,
    octaves
  );

  if (!inputState) return null;

  return (
    <div className="w-full">
      <div className="mt-4 flex flex-wrap gap-2">
        {generatedNotes.map((note, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center border ${
              note.note ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {note.note ? `${note.note}${note.octave ?? ""}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

const generateRandomNotes = (
  notesInKey: string[],
  numberOfNotes: number,
  numberOfEmptyNotes: number,
  octaves: number[]
): Note[] => {
  const emptyNoteIndices = new Set<number>();

  while (emptyNoteIndices.size < numberOfEmptyNotes) {
    emptyNoteIndices.add(Math.floor(Math.random() * numberOfNotes));
  }

  const randomNotes: Note[] = [];

  for (let i = 0; i < numberOfNotes; i++) {
    if (emptyNoteIndices.has(i)) {
      randomNotes.push({ note: "", octave: null });
    } else {
      const randomNote =
        notesInKey[Math.floor(Math.random() * notesInKey.length)];
      const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
      randomNotes.push({ note: randomNote, octave: randomOctave });
    }
  }

  return randomNotes;
};

export default NoteCreation;
