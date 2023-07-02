export const DEFAULT_KEY = "C";
export const DEFAULT_MODE = "ionian";
export const DEFAULT_TEMPO = 220;
export const DEFAULT_NUMBER_OF_NOTES = 8;
export const DEFAULT_INSTRUMENT = 5;
export const DEFAULT_OCTAVES = [3, 4];
export const DEFAULT_POSITION = 2;
export const DEFAULT_FINGER_RANGE = 6;
export const DEFAULT_VOLUME = 1;
export const DEFAULT_PANELS_TO_SHOW = ["Guitar"];
export const DEFAULT_NUMBER_OF_GUITAR_STRINGS = 6;
export const DEFAULT_NUMBER_OF_BASS_STRINGS = 4;

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
};

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

export const generateFrets = (baseNote) => {
  const baseIndex = KEYS.indexOf(baseNote.slice(0, -1));
  let currentOctave = parseInt(baseNote.slice(-1));

  let notes = [...Array(25).keys()].map((fret) => {
    let noteIndex = (baseIndex + fret) % 12;
    let noteName = KEYS[noteIndex];

    // When we reach a new C note, we know we've moved up an octave
    if (noteName === "C" && fret > 0) {
      currentOctave += 1;
    }

    return noteName + currentOctave;
  });

  return notes;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * i) + 1;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
