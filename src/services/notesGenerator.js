import { Note, Scale } from "tonal";
import { FLAT_TO_SHARP, getRandomItem, shuffleArray } from "../useful";

function getRandomNotes(notesInScale, total, empty, octaves) {
	let numberOfNotesToUse = total - empty;
	if (numberOfNotesToUse < 0) numberOfNotesToUse = total;

	const notesWithOctaves = Array(numberOfNotesToUse)
		.fill(0)
		.map(() => `${getRandomItem(notesInScale)}${getRandomItem(octaves)}`);
	
	const emptyNotes = Array(empty).fill("");
	const shuffled = shuffleArray([...notesWithOctaves, ...emptyNotes]);
	
	const firstNonEmptyNoteIndex = shuffled.findIndex((note) => note !== "");
	if (firstNonEmptyNoteIndex !== -1 && firstNonEmptyNoteIndex !== 0) {
		[shuffled[0], shuffled[firstNonEmptyNoteIndex]] = [
			shuffled[firstNonEmptyNoteIndex],
			shuffled[0],
		];
	}
	
	return shuffled;
}

export function getNotesInScale(key, scaleName) {
	const scale = Scale.get(`${key} ${scaleName}`);
	return scale.notes.map((note) => {
		const { pc, oct } = Note.get(Note.simplify(note));
		return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
	});
}

export function generateRandomNotes(inputState) {
	const notesInScale = getNotesInScale(inputState.key, inputState.scale);
	
	const totalNotes = Number.parseInt(inputState.numberOfNotes);
	const emptyNotes = Number.parseInt(inputState.emptyNotes);
	
	const randomNotes = getRandomNotes(
		notesInScale,
		totalNotes,
		emptyNotes,
		inputState.octaves
	);
	
	return {
		notesInScale,
		randomNotes
	};
}

export function validateEmptyNotes(numberOfNotes, emptyNotes) {
	const maxEmptyNotes = Math.max(0, Number.parseInt(numberOfNotes) - 3);
	return Math.min(Number.parseInt(emptyNotes), maxEmptyNotes);
}