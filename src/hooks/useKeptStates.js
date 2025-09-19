import { useCallback } from "react";
import { useStorage } from "./useLocalStorage";

const MAX_KEPT_STATES = 5;
const DEBUG = false;

export function useKeptStates() {
	const [keptStates, setKeptStates] = useStorage("keptStates", []);

	const debugLog = (...args) => {
		if (DEBUG) {
			console.log("[useKeptStates]", ...args);
		}
	};

	const addKeptState = useCallback(
		(stateId, displayName) => {
			debugLog("Adding state:", { stateId, displayName });

			setKeptStates((currentStates) => {
				const newState = {
					id: stateId,
					displayName,
					dateAdded: new Date().toISOString(),
				};

				const updatedStates =
					currentStates.length >= MAX_KEPT_STATES
						? currentStates.slice(1)
						: currentStates;

				return [...updatedStates, newState];
			});
		},
		[setKeptStates],
	);

	const removeKeptState = useCallback(
		(stateId) => {
			debugLog("Removing state:", stateId);

			setKeptStates((currentStates) =>
				currentStates.filter((state) => state.id !== stateId),
			);
		},
		[setKeptStates],
	);

	const getKeptStates = useCallback(() => {
		debugLog("Current kept states:", keptStates);
		return [...keptStates].sort(
			(a, b) => new Date(b.dateAdded) - new Date(a.dateAdded),
		);
	}, [keptStates]);

	const hasKeptState = useCallback(
		(stateId) => {
			const exists = keptStates.some((state) => state.id === stateId);
			debugLog("Checking if state exists:", stateId, exists);
			return exists;
		},
		[keptStates],
	);

	return {
		addKeptState,
		removeKeptState,
		getKeptStates,
		hasKeptState,
		keptStatesCount: keptStates.length,
	};
}
