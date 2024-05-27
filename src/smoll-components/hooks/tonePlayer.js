import { useEffect } from "react";
import * as Tone from "tone";

const useNotePlayer = (notes, tempo) => {
  useEffect(() => {
    const synth = new Tone.Synth({
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.005,
      },
    }).toDestination();

    const scheduleNotes = () => {
      const part = new Tone.Part(
        (time, note) => {
          synth.triggerAttackRelease(note, "8n", time);
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
      synth.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [notes, tempo]);
};

export default useNotePlayer;
