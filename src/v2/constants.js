export const NOTES = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
];

export const DEFAULT_TEMPO = 120;
export const DEFAULT_VOLUME = 1;

export const TEMPO_SLIDER = {
  min: 30,
  max: 600,
  defaultValue: DEFAULT_TEMPO,
};

export const VOLUME_SLIDER = {
  min: 0,
  max: 1,
  step: 0.01,
  defaultValue: DEFAULT_VOLUME,
};

// instruments.js
export const INSTRUMENTS = [
  { value: "acoustic_grand_piano", label: "Acoustic Grand Piano" },
  { value: "electric_grand_piano", label: "Electric Grand Piano" },
  { value: "honkytonk_piano", label: "Honky-tonk Piano" },
  // ... Add all other instruments here
  { value: "sitar", label: "Sitar" },
];
