// utils.js
export const DEFAULT_KEY = "C";
export const DEFAULT_MODE = "ionian";
export const DEFAULT_TEMPO = 220;
export const DEFAULT_NUMBER_OF_NOTES = 8;
export const DEFAULT_OCTAVES = [3, 4];

export const KEYS = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
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

export const mapToSelectOptions = (items) => {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
};
