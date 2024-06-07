import create from "zustand";

interface StoreState {
  key: string;
  setKey: (newKey: string) => void;
}

const useStore = create<StoreState>((set) => ({
  key: "C",
  setKey: (newKey) => set({ key: newKey }),
}));

export default useStore;
