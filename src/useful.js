export const DEFAULT_KEY = "C";
export const DEFAULT_MODE = "ionian";
export const DEFAULT_TEMPO = 220;
export const DEFAULT_NUMBER_OF_NOTES = 8;
export const DEFAULT_OCTAVES = [3, 4];

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

export const mapToSelectOptions = (items) => {
  return items.map((item) => ({
    label: item,
    value: item,
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

  let notes = [...Array(22).keys()].map((fret) => {
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
