import { useEffect, useRef } from "react";
import * as Tone from "tone";

const useNotePlayer = (
  notes,
  tempo,
  instrumentType = "AMSynth",
  volume = 0.5,
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

    if (!instruments[instrumentType]) {
      console.error(`Invalid instrument type: ${instrumentType}`);
      return;
    }

    if (instrumentRef.current) {
      instrumentRef.current.dispose();
    }

    instrumentRef.current = instruments[instrumentType]();
    instrumentRef.current.volume.value = Tone.gainToDb(volume);

    console.log(`Initialized ${instrumentType}`);

    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [instrumentType]);

  useEffect(() => {
    if (partRef.current) {
      partRef.current.dispose();
    }

    const instrument = instrumentRef.current;
    const scheduleNotes = () => {
      const part = new Tone.Part(
        (time, note) => {
          instrument.triggerAttackRelease(note, noteDuration, time);
          console.log(`Scheduled note: ${note} at time: ${time}`);
          if (setCurrentNote) {
            Tone.Draw.schedule(() => {
              setCurrentNote(note);
            }, time);
          }
        },
        notes.map((note, index) => [index * (60 / tempo), note])
      );

      part.loop = true;
      part.loopEnd = notes.length * (60 / tempo);
      return part;
    };

    partRef.current = scheduleNotes();
    partRef.current.start(0);

    if (Tone.Transport.state !== "started") {
      Tone.Transport.start();
      console.log("Tone.Transport started");
    }

    return () => {
      if (partRef.current) {
        partRef.current.dispose();
      }
      console.log("Part disposed");
    };
  }, [notes, tempo, noteDuration, setCurrentNote]);

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
    console.log(`Tempo set to ${tempo}`);
  }, [tempo]);

  useEffect(() => {
    if (instrumentRef.current) {
      instrumentRef.current.volume.value = Tone.gainToDb(volume);
      console.log(`Volume set to ${volume}`);
    }
  }, [volume]);
};

export default useNotePlayer;
