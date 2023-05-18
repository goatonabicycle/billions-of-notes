// utils.js
export const DEFAULT_KEY = "C";
export const DEFAULT_SCALE = "ionian";
export const DEFAULT_TEMPO = 120;
export const DEFAULT_NUMBER_OF_NOTES = 4;

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
