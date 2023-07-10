export const DEFAULT_KEY = "C";
export const DEFAULT_SCALE = "major pentatonic";
export const DEFAULT_TEMPO = 220;
export const DEFAULT_NUMBER_OF_NOTES = 8;
export const DEFAULT_INSTRUMENT = 5;
export const DEFAULT_OCTAVES = [3, 4];
export const DEFAULT_POSITION = 2;
export const DEFAULT_FINGER_RANGE = 6;
export const DEFAULT_VOLUME = 10;
export const DEFAULT_PANELS_TO_SHOW = ["Guitar"];
export const DEFAULT_NUMBER_OF_GUITAR_STRINGS = 6;
export const DEFAULT_NUMBER_OF_GUITAR_FRETS = 24;
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

export const INSTRUMENTS = {
  5: "Acoustic Grand Piano",
  15: "Bright Accoustic Piano",
  26: "Electric Grand Piano",
  32: "Honky Tonk Piano",
  43: "Electric Piano",
  73: "Harpsicord",
  84: "Clavinet",
  91: "Celesta",
  102: "Glockenspiel",
  111: "Music box",
  121: "Vibraphone",
  125: "Marimba",
  137: "Xylophone",
  184: "Rock Organ",
  279: "Jazz Guitar",
  296: "Clean Electric Guitar",
  306: "Muted Electric Guitar",
  322: "Overdriven Guitar",
  341: "Distorted Guitar",
};

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
  return items.map((item, value) => ({
    label: item,
    value: value,
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
