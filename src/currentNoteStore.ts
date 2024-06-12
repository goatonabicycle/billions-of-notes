import create from "zustand";

interface CurrentNoteState {
  currentNote: string | null;
  setCurrentNote: (note: string | null) => void;
}

const useCurrentNoteStore = create<CurrentNoteState>((set) => ({
  currentNote: null,
  setCurrentNote: (note) => set({ currentNote: note }),
}));

export default useCurrentNoteStore;
