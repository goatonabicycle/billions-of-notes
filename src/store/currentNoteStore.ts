import { create } from "zustand";

interface CurrentNoteStoreState {
  currentNotes: Record<string, string | null>;
  setCurrentNote: (id: string, note: string | null) => void;
  removeCurrentNote: (id: string) => void;
}

const useCurrentNoteStore = create<CurrentNoteStoreState>((set) => ({
  currentNotes: {},
  setCurrentNote: (id, note) => {
    set((state) => ({
      currentNotes: {
        ...state.currentNotes,
        [id]: note,
      },
    }));
  },
  removeCurrentNote: (id) => {
    set((state) => {
      const newCurrentNotes = { ...state.currentNotes };
      delete newCurrentNotes[id];
      return { currentNotes: newCurrentNotes };
    });
  },
}));

export default useCurrentNoteStore;
