import create from "zustand";

interface InputState {
  id: string;
  key: string;
  scale: string;
  numberOfNotes: number;
  numberOfEmptyNotes: number;
  octaves: number;
}

interface StoreState {
  inputStates: InputState[];
  addInputState: () => void;
  setInputState: (
    id: string,
    key: keyof InputState,
    value: InputState[keyof InputState]
  ) => void;
  removeInputState: (id: string) => void;
  resetInputState: () => void;
}

const DEFAULT_KEY = "C";
const DEFAULT_SCALE = "Major";
const DEFAULT_NUMBER_OF_NOTES = 12;
const DEFAULT_EMPTY_NOTES = 0;
const DEFAULT_OCTAVES = 2;

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

const useStore = create<StoreState>((set) => ({
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
      const updatedStates = state.inputStates.map((inputState) =>
        inputState.id === id ? { ...inputState, [key]: value } : inputState
      );
      localStorage.setItem("inputStates", JSON.stringify(updatedStates));
      return { inputStates: updatedStates };
    });
  },
  removeInputState: (id) => {
    set((state) => {
      const updatedStates = state.inputStates.filter(
        (inputState) => inputState.id !== id
      );
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

export default useStore;
