import create from "zustand";

interface CurrentNoteState {
  notes: Record<string, string | null>;
  setCurrentNote: (id: string, note: string | null) => void;
}

const useCurrentNoteStore = create<CurrentNoteState>((set) => ({
  notes: {},
  setCurrentNote: (id, note) =>
    set((state) => ({
      notes: {
        ...state.notes,
        [id]: note,
      },
    })),
}));

export default useCurrentNoteStore;
