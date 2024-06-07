import create from "zustand";

interface InputState {
  key: string;
  scale: string;
  numberOfNotes: number;
  emptyNotes: boolean;
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
const DEFAULT_EMPTY_NOTES = false;
const DEFAULT_OCTAVES = 2;

const useStore = create<StoreState>((set) => ({
  inputState: {
    key: DEFAULT_KEY,
    scale: DEFAULT_SCALE,
    numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
    emptyNotes: DEFAULT_EMPTY_NOTES,
    octaves: DEFAULT_OCTAVES,
  },
  setInputState: (key, value) =>
    set((state) => ({
      inputState: {
        ...state.inputState,
        [key]: value,
      },
    })),
  resetInputState: () =>
    set({
      inputState: {
        key: DEFAULT_KEY,
        scale: DEFAULT_SCALE,
        numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
        emptyNotes: DEFAULT_EMPTY_NOTES,
        octaves: DEFAULT_OCTAVES,
      },
    }),
}));

export default useStore;
