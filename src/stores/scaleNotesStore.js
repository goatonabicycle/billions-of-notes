import { create } from 'zustand';

const useScaleNotesStore = create((set, get) => ({
  activeNoteIndexes: {},

  initializeScale: (scaleName, noteCount) => {
    set((state) => ({
      activeNoteIndexes: {
        ...state.activeNoteIndexes,
        [scaleName]: Array.from({ length: noteCount }, (_, i) => i)
      }
    }));
  },

  toggleNoteIndex: (scaleName, noteIndex) => {
    const { activeNoteIndexes } = get();
    const currentIndexes = activeNoteIndexes[scaleName] || [];

    if (currentIndexes.length === 1 && currentIndexes.includes(noteIndex)) {
      return;
    }

    const newIndexes = currentIndexes.includes(noteIndex)
      ? currentIndexes.filter(i => i !== noteIndex)
      : [...currentIndexes, noteIndex].sort((a, b) => a - b);

    set((state) => ({
      activeNoteIndexes: {
        ...state.activeNoteIndexes,
        [scaleName]: newIndexes
      }
    }));
  },

  getActiveIndexes: (scaleName, totalNotes) => {
    const { activeNoteIndexes } = get();
    const indexes = activeNoteIndexes[scaleName];

    if (!indexes) {
      return Array.from({ length: totalNotes }, (_, i) => i);
    }

    return indexes;
  },

  resetScale: (scaleName, noteCount) => {
    set((state) => ({
      activeNoteIndexes: {
        ...state.activeNoteIndexes,
        [scaleName]: Array.from({ length: noteCount }, (_, i) => i)
      }
    }));
  }
}));

export default useScaleNotesStore;