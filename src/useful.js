// utils.js
export const DEFAULT_KEY = "C";
export const DEFAULT_MODE = "ionian";
export const DEFAULT_TEMPO = 220;
export const DEFAULT_NUMBER_OF_NOTES = 8;
export const DEFAULT_OCTAVE = 3;
export const DEFAULT_OCTAVE_RANGE = 1;

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

export const mapToSelectOptions = (items) => {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
};
