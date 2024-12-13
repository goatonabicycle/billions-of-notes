export const DEFAULT_KEY = "C";
export const DEFAULT_SCALE = "major";
export const DEFAULT_TEMPO = 220;
export const DEFAULT_NUMBER_OF_NOTES = 8;
export const DEFAULT_INSTRUMENT = 5;
export const DEFAULT_OCTAVES = [3, 4];
export const DEFAULT_POSITION = 2;
export const DEFAULT_FINGER_RANGE = 6;
export const DEFAULT_VOLUME = 10;
export const DEFAULT_EMPTY_NOTES = 0;
export const DEFAULT_NOTES_MODE = "sharp";
export const DEFAULT_NOTE_LENGTH = 2;
export const DEFAULT_PANELS_TO_SHOW = ["Guitar"];
export const DEFAULT_NUMBER_OF_GUITAR_STRINGS = 6;
export const DEFAULT_NUMBER_OF_GUITAR_FRETS = 24;
export const DEFAULT_NUMBER_OF_UKELELE_STRINGS = 4;
export const DEFAULT_NUMBER_OF_UKELELE_FRETS = 18;
export const DEFAULT_NUMBER_OF_BASS_STRINGS = 4;
export const DEFAULT_NUMBER_OF_BASS_FRETS = 24;

export const KEYS = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B",
];

export const OCTAVES = [1, 2, 3, 4, 5];

export const FLAT_TO_SHARP = {
	Cb: "B",
	Db: "C#",
	Eb: "D#",
	Fb: "E",
	Gb: "F#",
	Ab: "G#",
	Bb: "A#",
};

export const INSTRUMENTS = [
	{ value: "Synth", label: "Synth" },
	{ value: "AMSynth", label: "AM Synth" },
	{ value: "FMSynth", label: "FM Synth" },
	{ value: "MonoSynth", label: "Mono Synth" },
	{ value: "DuoSynth", label: "Duo Synth" },
	{ value: "PluckSynth", label: "Pluck Synth" },
	{ value: "MembraneSynth", label: "Membrane Synth" },
	{ value: "MetalSynth", label: "Metal Synth" },
	{ value: "PolySynth", label: "Poly Synth" },
];

export const INITIAL_GUITAR_TUNING = [
	{ note: "E", octave: 4 },
	{ note: "B", octave: 3 },
	{ note: "G", octave: 3 },
	{ note: "D", octave: 3 },
	{ note: "A", octave: 2 },
	{ note: "E", octave: 2 },
	{ note: "B", octave: 1 },
	{ note: "F#", octave: 1 },
];

export const INITIAL_BASS_TUNING = [
	{ note: "G", octave: 2 },
	{ note: "D", octave: 2 },
	{ note: "A", octave: 1 },
	{ note: "E", octave: 1 },
	{ note: "B", octave: 0 },
	{ note: "C", octave: 0 },
];

export const INITIAL_UKELELE_TUNING = [
	{ note: "A", octave: 3 },
	{ note: "E", octave: 3 },
	{ note: "C", octave: 3 },
	{ note: "G", octave: 3 },
];

export const mapToSelectOptions = (items) => {
	return items.map((item) => ({
		label: item,
		value: item,
	}));
};

export const mapObjectToSelectOptionsWithValues = (items) => {
	return Object.entries(items).map(([value, label]) => ({
		label,
		value,
	}));
};

export const mapToSelectOptionsWithValues = (items) => {
	return items.map((item) => ({
		label: item.label,
		value: item.value,
	}));
};

export const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 1; i--) {
		const j = Math.floor(Math.random() * i) + 1;
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export function noteToMidiNumber(note) {
	if (!note) return;

	const keyNumber = note.slice(0, -1);
	const octave = note.slice(-1);

	let midiNumber = KEYS.indexOf(keyNumber);
	if (midiNumber === -1) {
		console.error("Invalid note:", note);
		return;
	}

	midiNumber += octave * 12;

	return midiNumber;
}

export const randomRGBA = () => {
	const randomBetween = (min, max) =>
		min + Math.floor(Math.random() * (max - min + 1));
	const r = randomBetween(0, 255);
	const g = randomBetween(0, 255);
	const b = randomBetween(0, 255);
	return `rgba(${r}, ${g}, ${b}, 0.5)`;
};

export const getRandomItem = (arr) =>
	arr[Math.floor(Math.random() * arr.length)];
