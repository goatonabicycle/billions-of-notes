export const DEFAULT_KEY = "C";
export const DEFAULT_SCALE = "major pentatonic";
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
  { value: "acoustic_grand_piano", label: "Acoustic Grand Piano" },
  { value: "bright_acoustic_piano", label: "Bright Acoustic Piano" },
  { value: "electric_grand_piano", label: "Electric Grand Piano" },
  { value: "honkytonk_piano", label: "Honky-tonk Piano" },
  { value: "electric_piano_1", label: "Electric Piano 1" },
  { value: "electric_piano_2", label: "Electric Piano 2" },
  { value: "harpsichord", label: "Harpsichord" },
  { value: "clavinet", label: "Clavinet" },
  { value: "celesta", label: "Celesta" },
  { value: "glockenspiel", label: "Glockenspiel" },
  { value: "music_box", label: "Music Box" },
  { value: "vibraphone", label: "Vibraphone" },
  { value: "marimba", label: "Marimba" },
  { value: "xylophone", label: "Xylophone" },
  { value: "tubular_bells", label: "Tubular Bells" },
  { value: "dulcimer", label: "Dulcimer" },
  { value: "drawbar_organ", label: "Drawbar Organ" },
  { value: "percussive_organ", label: "Percussive Organ" },
  { value: "rock_organ", label: "Rock Organ" },
  { value: "church_organ", label: "Church Organ" },
  { value: "reed_organ", label: "Reed Organ" },
  { value: "accordion", label: "Accordion" },
  { value: "harmonica", label: "Harmonica" },
  { value: "tango_accordion", label: "Tango Accordion" },
  { value: "acoustic_guitar_nylon", label: "Acoustic Guitar Nylon" },
  { value: "acoustic_guitar_steel", label: "Acoustic Guitar Steel" },
  { value: "electric_guitar_jazz", label: "Electric Guitar Jazz" },
  { value: "electric_guitar_clean", label: "Electric Guitar Clean" },
  { value: "electric_guitar_muted", label: "Electric Guitar Muted" },
  { value: "overdriven_guitar", label: "Overdriven Guitar" },
  { value: "distortion_guitar", label: "Distortion Guitar" },
  { value: "guitar_harmonics", label: "Guitar Harmonics" },
  { value: "acoustic_bass", label: "Acoustic Bass" },
  { value: "electric_bass_finger", label: "Electric Bass Finger" },
  { value: "electric_bass_pick", label: "Electric Bass Pick" },
  { value: "fretless_bass", label: "Fretless Bass" },
  { value: "slap_bass_1", label: "Slap Bass 1" },
  { value: "slap_bass_2", label: "Slap Bass 2" },
  { value: "synth_bass_1", label: "Synth Bass 1" },
  { value: "synth_bass_2", label: "Synth Bass 2" },
  { value: "violin", label: "Violin" },
  { value: "viola", label: "Viola" },
  { value: "cello", label: "Cello" },
  { value: "contrabass", label: "Contrabass" },
  { value: "tremolo_strings", label: "Tremolo Strings" },
  { value: "pizzicato_strings", label: "Pizzicato Strings" },
  { value: "orchestral_harp", label: "Orchestral Harp" },
  { value: "timpani", label: "Timpani" },
  { value: "string_ensemble_1", label: "String Ensemble 1" },
  { value: "string_ensemble_2", label: "String Ensemble 2" },
  { value: "synth_strings_1", label: "Synth Strings 1" },
  { value: "synth_strings_2", label: "Synth Strings 2" },
  { value: "choir_aahs", label: "Choir Aahs" },
  { value: "voice_oohs", label: "Voice Oohs" },
  { value: "synth_choir", label: "Synth Choir" },
  { value: "orchestra_hit", label: "Orchestra Hit" },
  { value: "trumpet", label: "Trumpet" },
  { value: "trombone", label: "Trombone" },
  { value: "tuba", label: "Tuba" },
  { value: "muted_trumpet", label: "Muted Trumpet" },
  { value: "french_horn", label: "French Horn" },
  { value: "brass_section", label: "Brass Section" },
  { value: "synth_brass_1", label: "Synth Brass 1" },
  { value: "synth_brass_2", label: "Synth Brass 2" },
  { value: "soprano_sax", label: "Soprano Sax" },
  { value: "alto_sax", label: "Alto Sax" },
  { value: "tenor_sax", label: "Tenor Sax" },
  { value: "baritone_sax", label: "Baritone Sax" },
  { value: "oboe", label: "Oboe" },
  { value: "english_horn", label: "English Horn" },
  { value: "bassoon", label: "Bassoon" },
  { value: "clarinet", label: "Clarinet" },
  { value: "piccolo", label: "Piccolo" },
  { value: "flute", label: "Flute" },
  { value: "recorder", label: "Recorder" },
  { value: "pan_flute", label: "Pan Flute" },
  { value: "blown_bottle", label: "Blown Bottle" },
  { value: "shakuhachi", label: "Shakuhachi" },
  { value: "whistle", label: "Whistle" },
  { value: "ocarina", label: "Ocarina" },
  { value: "lead_1_square", label: "Lead 1 (Square)" },
  { value: "lead_2_sawtooth", label: "Lead 2 (Sawtooth)" },
  { value: "lead_3_calliope", label: "Lead 3 (Calliope)" },
  { value: "lead_4_chiff", label: "Lead 4 (Chiff)" },
  { value: "lead_5_charang", label: "Lead 5 (Charang)" },
  { value: "lead_6_voice", label: "Lead 6 (Voice)" },
  { value: "lead_7_fifths", label: "Lead 7 (Fifths)" },
  { value: "lead_8_bass__lead", label: "Lead 8 (Bass + Lead)" },
  { value: "pad_1_new_age", label: "Pad 1 (New Age)" },
  { value: "pad_2_warm", label: "Pad 2 (Warm)" },
  { value: "pad_3_polysynth", label: "Pad 3 (Polysynth)" },
  { value: "pad_4_choir", label: "Pad 4 (Choir)" },
  { value: "pad_5_bowed", label: "Pad 5 (Bowed)" },
  { value: "pad_6_metallic", label: "Pad 6 (Metallic)" },
  { value: "pad_7_halo", label: "Pad 7 (Halo)" },
  { value: "pad_8_sweep", label: "Pad 8 (Sweep)" },
  { value: "fx_1_rain", label: "FX 1 (Rain)" },
  { value: "fx_2_soundtrack", label: "FX 2 (Soundtrack)" },
  { value: "fx_3_crystal", label: "FX 3 (Crystal)" },
  { value: "fx_4_atmosphere", label: "FX 4 (Atmosphere)" },
  { value: "fx_5_brightness", label: "FX 5 (Brightness)" },
  { value: "fx_6_goblins", label: "FX 6 (Goblins)" },
  { value: "fx_7_echoes", label: "FX 7 (Echoes)" },
  { value: "fx_8_scifi", label: "FX 8 (SciFi)" },
  { value: "sitar", label: "Sitar" },
  { value: "banjo", label: "Banjo" },
  { value: "shamisen", label: "Shamisen" },
  { value: "koto", label: "Koto" },
  { value: "kalimba", label: "Kalimba" },
  { value: "bagpipe", label: "Bagpipe" },
  { value: "fiddle", label: "Fiddle" },
  { value: "shanai", label: "Shanai" },
  { value: "tinkle_bell", label: "Tinkle Bell" },
  { value: "agogo", label: "Agogo" },
  { value: "steel_drums", label: "Steel Drums" },
  { value: "woodblock", label: "Woodblock" },
  { value: "taiko_drum", label: "Taiko Drum" },
  { value: "melodic_tom", label: "Melodic Tom" },
  { value: "synth_drum", label: "Synth Drum" },
  { value: "reverse_cymbal", label: "Reverse Cymbal" },
  { value: "guitar_fret_noise", label: "Guitar Fret Noise" },
  { value: "breath_noise", label: "Breath Noise" },
  { value: "seashore", label: "Seashore" },
  { value: "bird_tweet", label: "Bird Tweet" },
  { value: "telephone_ring", label: "Telephone Ring" },
  { value: "helicopter", label: "Helicopter" },
  { value: "applause", label: "Applause" },
  { value: "gunshot", label: "Gunshot" },
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
