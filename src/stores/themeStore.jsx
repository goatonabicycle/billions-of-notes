import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
	persist(
		(set) => ({
			minimalistMode: false,
			setMinimalistMode: (enabled) => set({ minimalistMode: enabled }),
			toggleMinimalistMode: () =>
				set((state) => ({ minimalistMode: !state.minimalistMode })),
		}),
		{
			name: "theme-storage",
		},
	),
);

export default useThemeStore;
