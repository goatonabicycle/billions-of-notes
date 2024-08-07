import { create } from "zustand";
import { Scale } from "tonal";

export interface Note {
  note: string;
  octave: number | null;
}

interface NoteStoreState {
  generateNotes: (
    key: string,
    scale: string,
    numberOfNotes: number,
    numberOfEmptyNotes: number,
    octaves: number[]
  ) => Note[];
}

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
      const randomNote = notesInKey[Math.floor(Math.random() * notesInKey.length)];
      const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
      randomNotes.push({ note: randomNote, octave: randomOctave });
    }
  }

  return randomNotes;
};

const useNoteStore = create<NoteStoreState>(() => ({
  generateNotes: (key, scale, numberOfNotes, numberOfEmptyNotes, octaves) => {
    const notesInKey = Scale.get(`${key} ${scale}`).notes;
    return generateRandomNotes(notesInKey, numberOfNotes, numberOfEmptyNotes, octaves);
  },
}));

export default useNoteStore;
