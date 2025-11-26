import { supabase } from "../supabaseClient";

export async function loadSharedState(stateId) {
	try {
		const { data, error } = await supabase
			.from("app_states")
			.select("*")
			.eq("id", stateId)
			.single();

		if (error) {
			console.error("Error loading state:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in loadSharedState:", error);
		return null;
	}
}

export async function loadKeptState(stateId) {
	try {
		const { data, error } = await supabase
			.from("app_states")
			.select("*")
			.eq("id", stateId)
			.single();

		if (error) {
			console.error("Error loading kept state:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in loadKeptState:", error);
		return null;
	}
}

export function generateStateHash(stateToSave, randomNotes) {
	return btoa(JSON.stringify({ ...stateToSave, random_notes: randomNotes }));
}

async function findExistingState(stateHash) {
	try {
		const { data: existingState, error } = await supabase
			.from("app_states")
			.select("id")
			.eq("state_hash", stateHash)
			.single();

		if (error && error.code !== "PGRST116") {
			console.error("Error searching for state:", error);
			throw error;
		}

		return existingState?.id || null;
	} catch (error) {
		console.error("Error in findExistingState:", error);
		return null;
	}
}

async function createNewState(stateToSave, stateHash) {
	try {
		const { data: newState, error } = await supabase
			.from("app_states")
			.insert([{ ...stateToSave, state_hash: stateHash }])
			.select()
			.single();

		if (error) {
			console.error("Error saving state:", error);
			throw error;
		}

		return newState.id;
	} catch (error) {
		console.error("Error in createNewState:", error);
		return null;
	}
}

export async function saveState({
	inputState,
	controlState,
	randomNotes,
	selectedPanelsToShow,
}) {
	try {
		const stateToSave = {
			key: inputState.key,
			scale: inputState.scale,
			number_of_notes: inputState.numberOfNotes,
			empty_notes: inputState.emptyNotes,
			octaves: inputState.octaves,
			tempo: controlState.tempo,
			volume: controlState.volume,
			instrument: controlState.instrument,
			note_mode: "sharp",
			note_length: controlState.noteLength,
			tie_together: controlState.tieTogether,
			random_notes: randomNotes,
			panels_to_show: selectedPanelsToShow,
			created_at: new Date().toISOString(),
		};

		const stateHash = generateStateHash(stateToSave, randomNotes);

		let stateId = await findExistingState(stateHash);

		if (!stateId) {
			stateId = await createNewState(stateToSave, stateHash);
		}

		return stateId;
	} catch (error) {
		console.error("Error in saveState:", error);
		return null;
	}
}

export function generateDisplayName(inputState) {
	return `${inputState.key} ${inputState.scale} - ${inputState.numberOfNotes} notes`;
}

export function parseStateData(data) {
	return {
		inputState: {
			key: data.key,
			scale: data.scale,
			numberOfNotes: Number(data.number_of_notes),
			emptyNotes: Number(data.empty_notes),
			octaves: data.octaves,
		},
		controlState: {
			tempo: Number(data.tempo),
			volume: Number(data.volume),
			noteMode: data.note_mode,
			noteLength: Number(data.note_length),
			tieTogether: data.tie_together === true,
			instrument: data.instrument,
		},
		randomNotes: data.random_notes,
		panelsToShow: data.panels_to_show,
	};
}
