import { useEffect } from "react";
import * as Tone from "tone";

const useNotePlayer = (
  notes,
  tempo,
  instrumentType = "AMSynth",
  volume = 0.5,
  noteDuration = 0.5
) => {
  const noteToFrequency = (note) => {
    const noteFrequencies = {
      C: -9,
      "C#": -8,
      D: -7,
      "D#": -6,
      E: -5,
      F: -4,
      "F#": -3,
      G: -2,
      "G#": -1,
      A: 0,
      "A#": 1,
      B: 2,
    };

    const octave = parseInt(note.slice(-1));
    const key = note.slice(0, -1);
    const n = noteFrequencies[key] + 12 * (octave - 4);

    return 440 * Math.pow(2, n / 12);
  };

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const instruments = {
      Synth: new Tone.Synth().toDestination(),
      AMSynth: new Tone.AMSynth().toDestination(),
      FMSynth: new Tone.FMSynth().toDestination(),
      MonoSynth: new Tone.MonoSynth().toDestination(),
      // Add more Tone.js instruments as needed
    };

    const instrument = instruments[instrumentType];
    instrument.volume.value = volume * 20 - 20; // Tone.js volume ranges from -Infinity to 0 dB

    const scheduleNotes = () => {
      const part = new Tone.Part(
        (time, note) => {
          instrument.triggerAttackRelease(note, noteDuration, time);
        },
        notes.map((note, index) => [index * (60 / tempo), note])
      );

      part.loop = true;
      part.loopEnd = notes.length * (60 / tempo);
      return part;
    };

    Tone.Transport.bpm.value = tempo;
    const part = scheduleNotes();
    part.start(0);
    Tone.Transport.start();

    return () => {
      part.dispose();
      instrument.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [notes, tempo, instrumentType, volume, noteDuration]);
};

export default useNotePlayer;
