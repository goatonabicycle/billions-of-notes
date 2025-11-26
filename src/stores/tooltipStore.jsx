import { create } from "zustand";

const useTooltipStore = create((set) => ({
	tooltipsEnabled: true,
	setTooltipsEnabled: (enabled) => set({ tooltipsEnabled: enabled }),
}));

export default useTooltipStore;
