import { create } from "zustand";
import useNoteStore from "./noteStore";

interface Note {
  note: string;
  octave: number | null;
}

interface InputState {
  id: string;
  key: string;
  scale: string;
  numberOfNotes: number;
  numberOfEmptyNotes: number;
  octaves: number[];
  generatedNotes?: Note[];
}

interface InputStoreState {
  inputStates: InputState[];
  addInputState: () => void;
  setInputState: (id: string, key: keyof InputState, value: InputState[keyof InputState]) => void;
  generateNotes: (id: string) => void;
  removeInputState: (id: string) => void;
  resetInputState: () => void;
}

const DEFAULT_KEY = "C";
const DEFAULT_SCALE = "Major";
const DEFAULT_NUMBER_OF_NOTES = 12;
const DEFAULT_EMPTY_NOTES = 0;
const DEFAULT_OCTAVES = [1, 2];

const createDefaultInputState = (id: string): InputState => ({
  id,
  key: DEFAULT_KEY,
  scale: DEFAULT_SCALE,
  numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
  numberOfEmptyNotes: DEFAULT_EMPTY_NOTES,
  octaves: DEFAULT_OCTAVES,
});

const loadStateFromLocalStorage = (): InputState[] => {
  const savedState = localStorage.getItem("inputStates");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return [createDefaultInputState(`input_${Date.now()}`)];
};

const useInputStore = create<InputStoreState>((set) => ({
  inputStates: loadStateFromLocalStorage(),
  addInputState: () => {
    set((state) => {
      const newInputState = createDefaultInputState(`input_${Date.now()}`);
      const updatedStates = [...state.inputStates, newInputState];
      localStorage.setItem("inputStates", JSON.stringify(updatedStates));
      return { inputStates: updatedStates };
    });
  },
  setInputState: (id, key, value) => {
    set((state) => {
      const inputState = state.inputStates.find((s) => s.id === id);
      if (!inputState) return state;

      const updatedStates = state.inputStates.map((s) => (s.id === id ? { ...s, [key]: value } : s));

      const needsRegeneration = ["key", "scale", "numberOfNotes", "numberOfEmptyNotes", "octaves"].includes(key);

      if (needsRegeneration) {
        const updatedState = updatedStates.find((s) => s.id === id);
        if (updatedState) {
          updatedState.generatedNotes = useNoteStore
            .getState()
            .generateNotes(
              updatedState.key,
              updatedState.scale,
              updatedState.numberOfNotes,
              updatedState.numberOfEmptyNotes,
              updatedState.octaves
            );
        }
      }

      localStorage.setItem("inputStates", JSON.stringify(updatedStates));
      return { inputStates: updatedStates };
    });
  },
  generateNotes: (id) => {
    set((state) => {
      const inputState = state.inputStates.find((s) => s.id === id);
      if (!inputState) return state;

      inputState.generatedNotes = useNoteStore
        .getState()
        .generateNotes(
          inputState.key,
          inputState.scale,
          inputState.numberOfNotes,
          inputState.numberOfEmptyNotes,
          inputState.octaves
        );

      const updatedStates = state.inputStates.map((s) =>
        s.id === id ? { ...s, generatedNotes: inputState.generatedNotes } : s
      );

      localStorage.setItem("inputStates", JSON.stringify(updatedStates));
      return { inputStates: updatedStates };
    });
  },
  removeInputState: (id) => {
    set((state) => {
      const updatedStates = state.inputStates.filter((inputState) => inputState.id !== id);
      localStorage.setItem("inputStates", JSON.stringify(updatedStates));

      return { inputStates: updatedStates };
    });
  },
  resetInputState: () => {
    const defaultState = [createDefaultInputState(`input_${Date.now()}`)];
    localStorage.setItem("inputStates", JSON.stringify(defaultState));
    set({ inputStates: defaultState });
  },
}));

export default useInputStore;
