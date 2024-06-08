import create from "zustand";

interface InputState {
  key: string;
  scale: string;
  numberOfNotes: number;
  numberOfEmptyNotes: number;
  octaves: number;
}

interface StoreState {
  inputState: InputState;
  setInputState: <K extends keyof InputState>(
    key: K,
    value: InputState[K]
  ) => void;
  resetInputState: () => void;
}

const DEFAULT_KEY = "C";
const DEFAULT_SCALE = "Major";
const DEFAULT_NUMBER_OF_NOTES = 12;
const DEFAULT_EMPTY_NOTES = 0;
const DEFAULT_OCTAVES = 2;

const loadStateFromLocalStorage = (): InputState => {
  const savedState = localStorage.getItem("inputState");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    key: DEFAULT_KEY,
    scale: DEFAULT_SCALE,
    numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
    numberOfEmptyNotes: DEFAULT_EMPTY_NOTES,
    octaves: DEFAULT_OCTAVES,
  };
};

const useStore = create<StoreState>((set) => ({
  inputState: loadStateFromLocalStorage(),
  setInputState: (key, value) => {
    set((state) => {
      const newState = {
        ...state.inputState,
        [key]: value,
      };
      localStorage.setItem("inputState", JSON.stringify(newState));
      return { inputState: newState };
    });
  },
  resetInputState: () => {
    const defaultState = {
      key: DEFAULT_KEY,
      scale: DEFAULT_SCALE,
      numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
      numberOfEmptyNotes: DEFAULT_EMPTY_NOTES,
      octaves: DEFAULT_OCTAVES,
    };
    localStorage.setItem("inputState", JSON.stringify(defaultState));
    set({ inputState: defaultState });
  },
}));

export default useStore;
