import { useEffect, useRef } from "react";
import * as Tone from "tone";

const useNotePlayer = (
  notes,
  tempo,
  instrumentType = "AMSynth",
  volume = 1,
  noteDuration = 0.5,
  setCurrentNote
) => {
  const instrumentRef = useRef(null);
  const partRef = useRef(null);

  useEffect(() => {
    const instruments = {
      Synth: () => new Tone.Synth().toDestination(),
      AMSynth: () => new Tone.AMSynth().toDestination(),
      FMSynth: () => new Tone.FMSynth().toDestination(),
      MonoSynth: () => new Tone.MonoSynth().toDestination(),
    };

    if (instrumentRef.current) {
      instrumentRef.current.dispose();
    }

    instrumentRef.current = instruments[instrumentType]();

    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [instrumentType]);

  useEffect(() => {
    if (instrumentRef.current) {
      instrumentRef.current.volume.value = Tone.gainToDb(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    if (partRef.current) {
      partRef.current.dispose();
    }

    const instrument = instrumentRef.current;

    const part = new Tone.Part(
      (time, { note, index }) => {
        instrument.triggerAttackRelease(note, noteDuration, time);

        if (setCurrentNote) {
          requestAnimationFrame(() => {
            setCurrentNote(index);
          });
        }
      },
      notes.map((note, index) => ({
        time: index * (60 / tempo),
        note,
        index,
      }))
    );

    part.loop = true;
    part.loopEnd = notes.length * (60 / tempo);
    part.start(0);

    if (!Tone.Transport.state || Tone.Transport.state !== "started") {
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.start();
    }

    partRef.current = part;

    return () => {
      if (partRef.current) {
        partRef.current.stop();
        partRef.current.dispose();
      }
    };
  }, [notes, tempo, noteDuration, setCurrentNote]);
};

export default useNotePlayer;
